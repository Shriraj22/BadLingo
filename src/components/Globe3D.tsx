import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Country } from '../types';

interface Globe3DProps {
  countries: Country[];
  selectedCountryId?: string;
  onSelectCountry?: (country: Country) => void;
  interactive?: boolean;
  autoRotate?: boolean;
  showSpeechBubbles?: boolean;
  className?: string;
  zoomLevel?: number;
}

export const Globe3D: React.FC<Globe3DProps> = ({
  countries,
  selectedCountryId,
  onSelectCountry,
  interactive = true,
  autoRotate = true,
  showSpeechBubbles = false,
  className = '',
  zoomLevel = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Globe rotation state in radians
  const rotRef = useRef<{ yaw: number; pitch: number; vYaw: number; vPitch: number }>({
    yaw: 0.8,
    pitch: 0.25,
    vYaw: autoRotate ? 0.003 : 0,
    vPitch: 0,
  });

  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const [currentZoom, setCurrentZoom] = useState(zoomLevel);
  const countryScreenCoordsRef = useRef<Map<string, { x: number; y: number; visible: boolean }>>(new Map());

  // Target rotation for smooth transition when selectedCountryId changes
  const targetRotRef = useRef<{ yaw: number; pitch: number } | null>(null);

  // If selected country changes, target its coordinates
  useEffect(() => {
    if (selectedCountryId) {
      const c = countries.find((item) => item.id === selectedCountryId);
      if (c) {
        // Convert lat/lng to sphere yaw/pitch
        const targetYaw = -((c.lng * Math.PI) / 180) - Math.PI / 2;
        const targetPitch = (c.lat * Math.PI) / 180;
        targetRotRef.current = { yaw: targetYaw, pitch: targetPitch };
      }
    }
  }, [selectedCountryId, countries]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Pre-calculate dot grid points on sphere
    const spherePoints: Array<{ lat: number; lng: number }> = [];
    const numLatBands = 34;
    for (let i = 0; i <= numLatBands; i++) {
      const lat = -Math.PI / 2 + (i * Math.PI) / numLatBands;
      const radiusAtLat = Math.cos(lat);
      const numLngPoints = Math.max(1, Math.floor(68 * radiusAtLat));
      for (let j = 0; j < numLngPoints; j++) {
        const lng = -Math.PI + (j * 2 * Math.PI) / numLngPoints;
        spherePoints.push({ lat, lng });
      }
    }

    const render = () => {
      if (!canvas || !containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const radius = Math.min(width, height) * 0.38 * currentZoom;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Handle target smooth rotation
      if (targetRotRef.current) {
        let diffYaw = targetRotRef.current.yaw - rotRef.current.yaw;
        while (diffYaw > Math.PI) diffYaw -= 2 * Math.PI;
        while (diffYaw < -Math.PI) diffYaw += 2 * Math.PI;

        const diffPitch = targetRotRef.current.pitch - rotRef.current.pitch;
        rotRef.current.yaw += diffYaw * 0.08;
        rotRef.current.pitch += diffPitch * 0.08;

        if (Math.abs(diffYaw) < 0.005 && Math.abs(diffPitch) < 0.005) {
          targetRotRef.current = null;
        }
      } else if (!isDraggingRef.current && autoRotate) {
        rotRef.current.yaw += 0.0025;
      }

      // Inertia decay
      if (!isDraggingRef.current && !targetRotRef.current) {
        rotRef.current.yaw += rotRef.current.vYaw;
        rotRef.current.pitch += rotRef.current.vPitch;
        rotRef.current.vYaw *= 0.92;
        rotRef.current.vPitch *= 0.92;
      }

      // Clamp pitch to avoid gimbal flip
      rotRef.current.pitch = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, rotRef.current.pitch));

      const { yaw, pitch } = rotRef.current;
      const sinPitch = Math.sin(pitch);
      const cosPitch = Math.cos(pitch);

      // 1. Draw outer ambient atmosphere glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.85,
        centerX,
        centerY,
        radius * 1.35
      );
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
      glowGrad.addColorStop(0.5, 'rgba(216, 255, 56, 0.06)');
      glowGrad.addColorStop(1, 'rgba(11, 13, 19, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Globe base sphere gradient
      const sphereGrad = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGrad.addColorStop(0, '#19263e');
      sphereGrad.addColorStop(0.6, '#0f172a');
      sphereGrad.addColorStop(1, '#080c16');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Globe rim highlight
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.stroke();

      // 3. Draw latitude & longitude rings (subtle grid)
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
        ctx.beginPath();
        const rLat = (latDeg * Math.PI) / 180;
        const pts = 40;
        for (let i = 0; i <= pts; i++) {
          const lRad = (i / pts) * Math.PI * 2;
          const x0 = Math.cos(rLat) * Math.cos(lRad + yaw);
          const y0 = Math.sin(rLat);
          const z0 = Math.cos(rLat) * Math.sin(lRad + yaw);

          const y1 = y0 * cosPitch - z0 * sinPitch;
          const z1 = y0 * sinPitch + z0 * cosPitch;

          if (z1 > 0) {
            const px = centerX + x0 * radius;
            const py = centerY - y1 * radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // 4. Draw spherical landmass dot points
      ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
      for (const pt of spherePoints) {
        const x0 = Math.cos(pt.lat) * Math.cos(pt.lng + yaw);
        const y0 = Math.sin(pt.lat);
        const z0 = Math.cos(pt.lat) * Math.sin(pt.lng + yaw);

        const y1 = y0 * cosPitch - z0 * sinPitch;
        const z1 = y0 * sinPitch + z0 * cosPitch;

        if (z1 > 0) {
          const px = centerX + x0 * radius;
          const py = centerY - y1 * radius;
          const dotSize = 0.9 + z1 * 0.8;
          ctx.beginPath();
          ctx.arc(px, py, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Draw Country Pins & Labels
      const coordsMap = new Map<string, { x: number; y: number; visible: boolean }>();

      countries.forEach((country) => {
        const rLat = (country.lat * Math.PI) / 180;
        const rLng = (country.lng * Math.PI) / 180;

        const x0 = Math.cos(rLat) * Math.cos(rLng + yaw);
        const y0 = Math.sin(rLat);
        const z0 = Math.cos(rLat) * Math.sin(rLng + yaw);

        const y1 = y0 * cosPitch - z0 * sinPitch;
        const z1 = y0 * sinPitch + z0 * cosPitch;

        const isVisible = z1 > 0.05;
        const px = centerX + x0 * radius;
        const py = centerY - y1 * radius;

        coordsMap.set(country.id, { x: px, y: py, visible: isVisible });

        if (isVisible) {
          const isSelected = country.id === selectedCountryId;
          const isHovered = hoveredCountry?.id === country.id;

          // Outer glowing pulse ring
          ctx.beginPath();
          ctx.arc(px, py, isSelected ? 12 : isHovered ? 10 : 6, 0, Math.PI * 2);
          ctx.fillStyle = isSelected
            ? 'rgba(216, 255, 56, 0.35)'
            : isHovered
            ? 'rgba(56, 189, 248, 0.3)'
            : 'rgba(216, 255, 56, 0.15)';
          ctx.fill();

          // Core pin dot
          ctx.beginPath();
          ctx.arc(px, py, isSelected ? 5.5 : isHovered ? 4.5 : 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#d8ff38' : isHovered ? '#38bdf8' : '#e2e8f0';
          ctx.fill();

          // Country Name Badge Pill
          ctx.font = isSelected || isHovered ? 'bold 12px "Syne", sans-serif' : '11px "Plus Jakarta Sans", sans-serif';
          const text = `${country.flag} ${country.name}`;
          const textWidth = ctx.measureText(text).width;
          const pillX = px - textWidth / 2 - 8;
          const pillY = py - 26;

          // Pill Background
          ctx.fillStyle = isSelected
            ? 'rgba(216, 255, 56, 0.95)'
            : isHovered
            ? 'rgba(15, 23, 42, 0.95)'
            : 'rgba(15, 23, 42, 0.75)';
          ctx.strokeStyle = isSelected ? '#d8ff38' : isHovered ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.roundRect(pillX, pillY, textWidth + 16, 20, 10);
          ctx.fill();
          ctx.stroke();

          // Pill Text
          ctx.fillStyle = isSelected ? '#0f172a' : '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, px, pillY + 10);
        }
      });

      countryScreenCoordsRef.current = coordsMap;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [countries, selectedCountryId, autoRotate, currentZoom, hoveredCountry]);

  // Mouse & Touch Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    targetRotRef.current = null;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!interactive) return;

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      rotRef.current.yaw += dx * 0.005;
      rotRef.current.pitch -= dy * 0.005;
      rotRef.current.vYaw = dx * 0.002;
      rotRef.current.vPitch = -dy * 0.002;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    } else {
      // Check for hover over country pins
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found: Country | null = null;
      for (const country of countries) {
        const coords = countryScreenCoordsRef.current.get(country.id);
        if (coords && coords.visible) {
          const dist = Math.hypot(coords.x - mouseX, coords.y - mouseY);
          if (dist < 28) {
            found = country;
            break;
          }
        }
      }
      setHoveredCountry(found);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (const country of countries) {
      const coords = countryScreenCoordsRef.current.get(country.id);
      if (coords && coords.visible) {
        const dist = Math.hypot(coords.x - mouseX, coords.y - mouseY);
        if (dist < 32) {
          onSelectCountry?.(country);
          break;
        }
      }
    }
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!interactive) return;
    e.preventDefault();
    setCurrentZoom((prev) => Math.max(0.7, Math.min(1.6, prev - e.deltaY * 0.001)));
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}
      onWheel={handleWheel}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleClick}
      />

      {/* Landing page floating speech bubbles */}
      {showSpeechBubbles && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left - USA */}
          <div className="absolute top-[18%] left-[8%] md:left-[18%] animate-float-1 pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
            <div className="bg-[#e84393] text-white px-3 py-1.5 rounded-2xl shadow-lg shadow-pink-500/30 text-xs font-bold flex items-center gap-1.5 border border-white/20">
              <span className="text-[13px]">S***</span>
              <span className="text-[10px] bg-black/30 px-1 rounded uppercase tracking-wider">USA</span>
            </div>
            <div className="w-2.5 h-2.5 bg-[#e84393] rotate-45 ml-4 -mt-1 rounded-sm" />
          </div>

          {/* Top Right - UK */}
          <div className="absolute top-[16%] right-[10%] md:right-[20%] animate-float-2 pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
            <div className="bg-[#f59e0b] text-slate-950 px-3 py-1.5 rounded-2xl shadow-lg shadow-amber-500/30 text-xs font-black flex items-center gap-1.5 border border-white/30">
              <span className="text-[13px]">b****</span>
              <span className="text-[10px] bg-white/40 px-1 rounded uppercase tracking-wider">UK</span>
            </div>
            <div className="w-2.5 h-2.5 bg-[#f59e0b] rotate-45 ml-5 -mt-1 rounded-sm" />
          </div>

          {/* Mid Right - France */}
          <div className="absolute top-[48%] right-[6%] md:right-[15%] animate-float-3 pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
            <div className="bg-[#a855f7] text-white px-3 py-1.5 rounded-2xl shadow-lg shadow-purple-500/30 text-xs font-bold flex items-center gap-1.5 border border-white/20">
              <span className="text-[13px]">f***</span>
              <span className="text-[10px] bg-black/30 px-1 rounded uppercase tracking-wider">France</span>
            </div>
            <div className="w-2.5 h-2.5 bg-[#a855f7] rotate-45 ml-6 -mt-1 rounded-sm" />
          </div>

          {/* Bottom Left - Brazil */}
          <div className="absolute bottom-[28%] left-[6%] md:left-[15%] animate-float-4 pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
            <div className="bg-[#10b981] text-slate-950 px-3 py-1.5 rounded-2xl shadow-lg shadow-emerald-500/30 text-xs font-black flex items-center gap-1.5 border border-white/30">
              <span className="text-[13px]">c****</span>
              <span className="text-[10px] bg-black/20 px-1 rounded uppercase tracking-wider">Brazil</span>
            </div>
            <div className="w-2.5 h-2.5 bg-[#10b981] rotate-45 ml-4 -mt-1 rounded-sm" />
          </div>

          {/* Bottom Right - Japan */}
          <div className="absolute bottom-[24%] right-[12%] md:right-[22%] animate-float-1 pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
            <div className="bg-[#ef4444] text-white px-3 py-1.5 rounded-2xl shadow-lg shadow-rose-500/30 text-xs font-bold flex items-center gap-1.5 border border-white/20">
              <span className="text-[13px]">p***</span>
              <span className="text-[10px] bg-black/30 px-1 rounded uppercase tracking-wider">Japan</span>
            </div>
            <div className="w-2.5 h-2.5 bg-[#ef4444] rotate-45 ml-5 -mt-1 rounded-sm" />
          </div>
        </div>
      )}

      {/* Floating Zoom Controls for interactive view */}
      {interactive && !showSpeechBubbles && (
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
          <button
            type="button"
            onClick={() => setCurrentZoom((z) => Math.min(1.6, z + 0.15))}
            className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200 hover:text-white hover:border-[#d8ff38] flex items-center justify-center font-bold text-lg shadow-lg active:scale-95 transition-all"
            title="Zoom In"
            aria-label="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setCurrentZoom((z) => Math.max(0.7, z - 0.15))}
            className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200 hover:text-white hover:border-[#d8ff38] flex items-center justify-center font-bold text-lg shadow-lg active:scale-95 transition-all"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            −
          </button>
        </div>
      )}
    </div>
  );
};
