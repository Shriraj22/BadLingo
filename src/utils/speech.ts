/**
 * Text-to-speech utility with Web Speech API and Web Audio synthesizer fallback
 */

export function speakWord(text: string, langCode: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Stop any pending speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCode || 'en-US';
        utterance.rate = 0.88; // Slightly slower for clear pronunciation
        utterance.pitch = 1.0;

        // Try to match an available voice
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find((v) => v.lang === langCode || v.lang.startsWith(langCode.slice(0, 2)));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }

        utterance.onend = () => resolve(true);
        utterance.onerror = () => {
          playFallbackTone();
          resolve(false);
        };

        window.speechSynthesis.speak(utterance);
        return;
      } catch (err) {
        console.warn('SpeechSynthesis error:', err);
      }
    }

    // Fallback audio feedback
    playFallbackTone();
    resolve(false);
  });
}

function playFallbackTone() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {
    // Ignore audio context errors
  }
}
