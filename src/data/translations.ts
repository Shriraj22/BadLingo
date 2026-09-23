import { AppLanguage } from '../types';

export interface UIStrings {
  appName: string;
  heroHeadline: string;
  heroSubheadline: string;
  getStarted: string;
  exploreGlobe: string;
  taglinePills: string;
  samePlanetDifferentWords: string;
  
  // Auth
  login: string;
  signUp: string;
  createAccount: string;
  welcomeBack: string;
  signUpSubtitle: string;
  loginSubtitle: string;
  continueWithGoogle: string;
  or: string;
  fullName: string;
  email: string;
  password: string;
  forgotPassword: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  termsAgreement: string;
  
  // Navigation
  explore: string;
  savedWords: string;
  profile: string;
  searchPlaceholder: string;
  surpriseMe: string;
  takeMeRandom: string;
  
  // Country & Regions
  overviewTab: string;
  regionsTab: string;
  cultureTab: string;
  exploreWords: string;
  selectRegion: string;
  shadesOfSlang: string;
  
  // Word List & Detail
  wordsTab: string;
  aboutTab: string;
  meaning: string;
  examples: string;
  context: string;
  readAloud: string;
  saveWord: string;
  saved: string;
  playAudio: string;
  nextWord: string;
  prevWord: string;
  intensityMild: string;
  intensityOffensive: string;
  intensityVeryOffensive: string;
  
  // Surprise Modal
  surpriseTitle: string;
  surpriseSubtitle: string;
  exploreTopWords: string;
  tryAnotherCountry: string;
  
  // Saved Words
  savedWordsTitle: string;
  savedWordsSubtitle: string;
  filterCountries: string;
  filterIntensity: string;
  allCountries: string;
  allIntensities: string;
  noSavedWords: string;
  noSavedWordsDesc: string;
  startExploring: string;
  
  // Profile
  profileTitle: string;
  statsSavedWords: string;
  statsCountries: string;
  statsLanguages: string;
  appLanguage: string;
  notifications: string;
  helpSupport: string;
  termsPrivacy: string;
  logOut: string;
  editProfile: string;
  profileMotto: string;
}

export const translations: Record<AppLanguage, UIStrings> = {
  en: {
    appName: 'BadLingo',
    heroHeadline: "LEARN THE WORDS THEY DON'T TEACH YOU.",
    heroSubheadline: "Explore the world's slang, insults and bad words — before someone says one to you.",
    getStarted: 'Get Started',
    exploreGlobe: 'Explore the Globe',
    taglinePills: 'TRAVEL · LEARN · UNDERSTAND · CONNECT',
    samePlanetDifferentWords: 'SAME PLANET. DIFFERENT WORDS.',
    
    login: 'Log In',
    signUp: 'Sign Up',
    createAccount: 'Create your account',
    welcomeBack: 'Welcome back!',
    signUpSubtitle: 'Start exploring the world, one bad word at a time.',
    loginSubtitle: 'Same planet. Fewer misunderstandings.',
    continueWithGoogle: 'Continue with Google',
    or: 'OR',
    fullName: 'Full Name',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    alreadyHaveAccount: 'Already have an account? Log In',
    dontHaveAccount: "Don't have an account? Sign Up",
    termsAgreement: 'By signing up, you agree to our Terms of Service and Privacy Policy.',
    
    explore: 'Explore',
    savedWords: 'Saved Words',
    profile: 'Profile',
    searchPlaceholder: 'Search country or region...',
    surpriseMe: 'Surprise Me',
    takeMeRandom: 'Take me to a random country',
    
    overviewTab: 'Overview',
    regionsTab: 'Regions',
    cultureTab: 'Culture',
    exploreWords: 'Explore Words',
    selectRegion: 'Select a region',
    shadesOfSlang: 'Different shades of slang & insults.',
    
    wordsTab: 'Words',
    aboutTab: 'About',
    meaning: 'Meaning',
    examples: 'Examples',
    context: 'Context & Situation',
    readAloud: 'Read Aloud',
    saveWord: 'Save Word',
    saved: 'Saved',
    playAudio: 'Play',
    nextWord: 'Next Word',
    prevWord: 'Previous Word',
    intensityMild: 'Mild',
    intensityOffensive: 'Offensive',
    intensityVeryOffensive: 'Very Offensive',
    
    surpriseTitle: 'Surprise Me! 🤯',
    surpriseSubtitle: 'Discover a random bad word from around the world.',
    exploreTopWords: 'Explore Top 10 Words',
    tryAnotherCountry: 'Try Another Country',
    
    savedWordsTitle: 'Saved Words',
    savedWordsSubtitle: 'Your collection of interesting (and dangerous) words.',
    filterCountries: 'Countries',
    filterIntensity: 'Intensity',
    allCountries: 'All Countries',
    allIntensities: 'All Intensities',
    noSavedWords: 'No saved words yet!',
    noSavedWordsDesc: 'Go explore the globe and bookmark spicy slang you find.',
    startExploring: 'Start Exploring',
    
    profileTitle: 'Profile',
    statsSavedWords: 'Saved Words',
    statsCountries: 'Countries',
    statsLanguages: 'Languages',
    appLanguage: 'App Language',
    notifications: 'Notifications',
    helpSupport: 'Help & Support',
    termsPrivacy: 'Terms & Privacy',
    logOut: 'Log Out',
    editProfile: 'Edit Profile',
    profileMotto: 'BE CURIOUS. BE RESPECTFUL. STAY SAFE.',
  },
  es: {
    appName: 'BadLingo',
    heroHeadline: 'APRENDE LAS PALABRAS QUE NO TE ENSEÑAN.',
    heroSubheadline: 'Explora la jerga, insultos y malas palabras del mundo, antes de que alguien te las diga a ti.',
    getStarted: 'Empezar Ahora',
    exploreGlobe: 'Explorar el Globo',
    taglinePills: 'VIAJAR · APRENDER · COMPRENDER · CONECTAR',
    samePlanetDifferentWords: 'MISMO PLANETA. DIFERENTES PALABRAS.',
    
    login: 'Iniciar Sesión',
    signUp: 'Registrarse',
    createAccount: 'Crea tu cuenta',
    welcomeBack: '¡Bienvenido de nuevo!',
    signUpSubtitle: 'Empieza a explorar el mundo, una palabrota a la vez.',
    loginSubtitle: 'Mismo planeta. Menos malentendidos.',
    continueWithGoogle: 'Continuar con Google',
    or: 'O',
    fullName: 'Nombre Completo',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    alreadyHaveAccount: '¿Ya tienes cuenta? Iniciar Sesión',
    dontHaveAccount: '¿No tienes cuenta? Regístrate',
    termsAgreement: 'Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad.',
    
    explore: 'Explorar',
    savedWords: 'Guardadas',
    profile: 'Perfil',
    searchPlaceholder: 'Buscar país o región...',
    surpriseMe: 'Sorpréndeme',
    takeMeRandom: 'Llévame a un país al azar',
    
    overviewTab: 'Resumen',
    regionsTab: 'Regiones',
    cultureTab: 'Cultura',
    exploreWords: 'Explorar Palabras',
    selectRegion: 'Selecciona una región',
    shadesOfSlang: 'Diferentes matices de jerga e insultos.',
    
    wordsTab: 'Palabras',
    aboutTab: 'Acerca de',
    meaning: 'Significado',
    examples: 'Ejemplos',
    context: 'Contexto y Situación',
    readAloud: 'Escuchar',
    saveWord: 'Guardar Palabra',
    saved: 'Guardado',
    playAudio: 'Reproducir',
    nextWord: 'Siguiente Palabra',
    prevWord: 'Palabra Anterior',
    intensityMild: 'Leve',
    intensityOffensive: 'Ofensivo',
    intensityVeryOffensive: 'Muy Ofensivo',
    
    surpriseTitle: '¡Sorpréndeme! 🤯',
    surpriseSubtitle: 'Descubre una mala palabra al azar de alrededor del mundo.',
    exploreTopWords: 'Explorar las 10 Mejores Palabras',
    tryAnotherCountry: 'Probar Otro País',
    
    savedWordsTitle: 'Palabras Guardadas',
    savedWordsSubtitle: 'Tu colección de palabras interesantes (y peligrosas).',
    filterCountries: 'Países',
    filterIntensity: 'Intensidad',
    allCountries: 'Todos los Países',
    allIntensities: 'Todas las Intensidades',
    noSavedWords: '¡No hay palabras guardadas aún!',
    noSavedWordsDesc: 'Explora el globo y guarda la jerga picante que encuentres.',
    startExploring: 'Empezar a Explorar',
    
    profileTitle: 'Perfil',
    statsSavedWords: 'Palabras Guardadas',
    statsCountries: 'Países',
    statsLanguages: 'Idiomas',
    appLanguage: 'Idioma de la App',
    notifications: 'Notificaciones',
    helpSupport: 'Ayuda y Soporte',
    termsPrivacy: 'Términos y Privacidad',
    logOut: 'Cerrar Sesión',
    editProfile: 'Editar Perfil',
    profileMotto: 'SÉ CURIOSO. SÉ RESPETUOSO. MANTENTE A SALVO.',
  },
  fr: {
    appName: 'BadLingo',
    heroHeadline: 'APPRENEZ LES MOTS QU’ON NE VOUS ENSEIGNE PAS.',
    heroSubheadline: "Explorez l'argot, les insultes et les gros mots du monde — avant qu'on ne vous en lance un.",
    getStarted: 'Commencer',
    exploreGlobe: 'Explorer le Globe',
    taglinePills: 'VOYAGER · APPRENDRE · COMPRENDRE · CONNECTER',
    samePlanetDifferentWords: 'MÊME PLANÈTE. MOTS DIFFÉRENTS.',
    
    login: 'Connexion',
    signUp: "S'inscrire",
    createAccount: 'Créer votre compte',
    welcomeBack: 'Bon retour !',
    signUpSubtitle: 'Commencez à explorer le monde, un gros mot à la fois.',
    loginSubtitle: 'Même planète. Moins de malentendus.',
    continueWithGoogle: 'Continuer avec Google',
    or: 'OU',
    fullName: 'Nom Complet',
    email: 'E-mail',
    password: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    alreadyHaveAccount: 'Vous avez déjà un compte ? Connexion',
    dontHaveAccount: "Pas encore de compte ? S'inscrire",
    termsAgreement: "En vous inscrivant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.",
    
    explore: 'Explorer',
    savedWords: 'Mots Enregistrés',
    profile: 'Profil',
    searchPlaceholder: 'Rechercher un pays ou une région...',
    surpriseMe: 'Surprenez-moi',
    takeMeRandom: 'Emmenez-moi dans un pays au hasard',
    
    overviewTab: 'Aperçu',
    regionsTab: 'Régions',
    cultureTab: 'Culture',
    exploreWords: 'Explorer les Mots',
    selectRegion: 'Sélectionner une région',
    shadesOfSlang: "Différentes nuances d'argot et d'insultes.",
    
    wordsTab: 'Mots',
    aboutTab: 'À propos',
    meaning: 'Signification',
    examples: 'Exemples',
    context: 'Contexte & Situation',
    readAloud: 'Écouter',
    saveWord: 'Enregistrer le Mot',
    saved: 'Enregistré',
    playAudio: 'Lire',
    nextWord: 'Mot Suivant',
    prevWord: 'Mot Précédent',
    intensityMild: 'Léger',
    intensityOffensive: 'Offensant',
    intensityVeryOffensive: 'Très Offensant',
    
    surpriseTitle: 'Surprenez-moi ! 🤯',
    surpriseSubtitle: 'Découvrez un gros mot au hasard à travers le monde.',
    exploreTopWords: 'Explorer le Top 10',
    tryAnotherCountry: 'Essayer un autre pays',
    
    savedWordsTitle: 'Mots Enregistrés',
    savedWordsSubtitle: 'Votre collection de mots fascinants (et dangereux).',
    filterCountries: 'Pays',
    filterIntensity: 'Intensité',
    allCountries: 'Tous les pays',
    allIntensities: 'Toutes les intensités',
    noSavedWords: 'Aucun mot enregistré pour le moment !',
    noSavedWordsDesc: 'Parcourez le globe et sauvegardez les expressions savoureuses que vous découvrez.',
    startExploring: 'Commencer à Explorer',
    
    profileTitle: 'Profil',
    statsSavedWords: 'Mots Enregistrés',
    statsCountries: 'Pays',
    statsLanguages: 'Langues',
    appLanguage: "Langue de l'App",
    notifications: 'Notifications',
    helpSupport: 'Aide & Support',
    termsPrivacy: 'Conditions & Confidentialité',
    logOut: 'Se Déconnecter',
    editProfile: 'Modifier le Profil',
    profileMotto: 'SOYEZ CURIEUX. SOYEZ RESPECTUEUX. RESTEZ EN SÉCURITÉ.',
  },
  hi: {
    appName: 'BadLingo',
    heroHeadline: 'वो शब्द सीखें जो कोई स्कूल नहीं सिखाता।',
    heroSubheadline: 'दुनिया भर की गालियां, स्लैंग और तीखे शब्द जानें — इससे पहले कि कोई आप पर इस्तेमाल करे।',
    getStarted: 'शुरू करें',
    exploreGlobe: 'ग्लोब एक्सप्लोर करें',
    taglinePills: 'यात्रा · सीखें · समझें · जुड़ें',
    samePlanetDifferentWords: 'एक ही धरती. अलग-अलग गालियां.',
    
    login: 'लॉग इन करें',
    signUp: 'साइन अप करें',
    createAccount: 'अपना खाता बनाएं',
    welcomeBack: 'वापसी पर स्वागत है!',
    signUpSubtitle: 'दुनिया के तीखे शब्दों की रोमांचक यात्रा शुरू करें।',
    loginSubtitle: 'वही ग्रह। कम गलतफहमियां।',
    continueWithGoogle: 'गूगल के साथ जारी रखें',
    or: 'या',
    fullName: 'पूरा नाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गए?',
    alreadyHaveAccount: 'पहले से खाता है? लॉग इन करें',
    dontHaveAccount: 'खाता नहीं है? साइन अप करें',
    termsAgreement: 'साइन अप करके आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत होते हैं।',
    
    explore: 'एक्सप्लोर',
    savedWords: 'सहेजे गए शब्द',
    profile: 'प्रोफ़ाइल',
    searchPlaceholder: 'देश या क्षेत्र खोजें...',
    surpriseMe: 'सरप्राइज मी 🤯',
    takeMeRandom: 'किसी अनजाने देश ले चलो',
    
    overviewTab: 'अवलोकन',
    regionsTab: 'क्षेत्र (Regions)',
    cultureTab: 'संस्कृति',
    exploreWords: 'शब्द एक्सप्लोर करें',
    selectRegion: 'एक क्षेत्र चुनें',
    shadesOfSlang: 'गालियों और स्लैंग के अलग-अलग रंग।',
    
    wordsTab: 'शब्द',
    aboutTab: 'परिचय',
    meaning: 'अर्थ',
    examples: 'उदाहरण',
    context: 'संदर्भ और स्थिति',
    readAloud: 'उच्चारण सुनें',
    saveWord: 'शब्द सहेजें',
    saved: 'सहेजा गया',
    playAudio: 'ऑडियो चलाएं',
    nextWord: 'अगला शब्द',
    prevWord: 'पिछला शब्द',
    intensityMild: 'हल्का (Mild)',
    intensityOffensive: 'अपमानजनक (Offensive)',
    intensityVeryOffensive: 'अत्यधिक अपमानजनक (Very Offensive)',
    
    surpriseTitle: 'सरप्राइज मी! 🤯',
    surpriseSubtitle: 'दुनिया के किसी कोने से एक चटपटा शब्द जानें।',
    exploreTopWords: 'शीर्ष 10 शब्द देखें',
    tryAnotherCountry: 'दूसरा देश आज़माएं',
    
    savedWordsTitle: 'सहेजे गए शब्द',
    savedWordsSubtitle: 'आपके पसंदीदा तीखे और मनोरंजक शब्दों का संग्रह।',
    filterCountries: 'देश',
    filterIntensity: 'तीखापन (Intensity)',
    allCountries: 'सभी देश',
    allIntensities: 'सभी श्रेणियां',
    noSavedWords: 'अभी तक कोई शब्द सहेजा नहीं गया!',
    noSavedWordsDesc: 'ग्लोब पर जाएं और दिलचस्प स्लैंग को बुकमार्क करें।',
    startExploring: 'एक्सप्लोर करना शुरू करें',
    
    profileTitle: 'प्रोफ़ाइल',
    statsSavedWords: 'सहेजे गए शब्द',
    statsCountries: 'एक्सप्लोर किए देश',
    statsLanguages: 'भाषाएं',
    appLanguage: 'ऐप की भाषा',
    notifications: 'सूचनाएं (Notifications)',
    helpSupport: 'सहायता एवं संपर्क',
    termsPrivacy: 'नियम व गोपनीयता',
    logOut: 'लॉग आउट',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    profileMotto: 'जिज्ञासु रहें। मर्यादा रखें। सुरक्षित रहें।',
  },
};
