import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { Language } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    about: 'À propos',
    login: 'Connexion',
    register: 'S\'inscrire',
    logout: 'Déconnexion',
    dashboard: 'Tableau de bord',
    exams: 'Examens',
    quizzes: 'Quiz',
    books: 'Livres',
    summaries: 'Résumés',
    corrections: 'Corrections',
    profile: 'Profil',
    
    // Auth
    email: 'Adresse email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    firstName: 'Prénom',
    lastName: 'Nom',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié ?',
    acceptTerms: 'J\'accepte les conditions',
    privacyPolicy: 'politique de confidentialité',
    termsOfService: 'conditions d\'utilisation',
    noAccount: 'Pas encore de compte ?',
    hasAccount: 'Déjà un compte ?',
    
    // Dashboard
    welcomeBack: 'Bon retour',
    totalExams: 'Examens totaux',
    completedExams: 'Examens complétés',
    averageScore: 'Score moyen',
    studyTime: 'Temps d\'étude',
    recentActivity: 'Activité récente',
    viewAll: 'Voir tout',
    upcomingExams: 'Examens à venir',
    
    // Books
    buyBook: 'Acheter le livre',
    downloadBook: 'Télécharger',
    readOnline: 'Lire en ligne',
    bookDetails: 'Détails du livre',
    includedInPlan: 'Inclus dans votre abonnement',
    purchaseSeparately: 'Acheter séparément',
    freeWithSubscription: 'GRATUIT avec abonnement',
    pages: 'pages',
    format: 'Format',
    preview: 'Aperçu',
    
    // Exams
    startExam: 'Commencer l\'examen',
    viewResults: 'Voir les résultats',
    duration: 'Durée',
    questions: 'questions',
    difficulty: 'Difficulté',
    date: 'Date',
    subject: 'Matière',
    progressOverview: 'Aperçu de la progression',
    
    // Common
    backToHome: 'Retour à l\'accueil',
    loading: 'Chargement...',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    view: 'Voir',
    search: 'Rechercher...',
    filter: 'Filtrer',
    all: 'Tous',
    seeMore: 'Voir plus',
    startNow: 'Commencer maintenant'
  },
  en: {
    // Navigation
    home: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    about: 'About',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard',
    exams: 'Exams',
    quizzes: 'Quizzes',
    books: 'Books',
    summaries: 'Summaries',
    corrections: 'Corrections',
    profile: 'Profile',
    
    // Auth
    email: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm password',
    firstName: 'First name',
    lastName: 'Last name',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    acceptTerms: 'I accept the',
    privacyPolicy: 'privacy policy',
    termsOfService: 'terms of service',
    noAccount: 'Don\'t have an account?',
    hasAccount: 'Already have an account?',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    totalExams: 'Total exams',
    completedExams: 'Completed exams',
    averageScore: 'Average score',
    studyTime: 'Study time',
    recentActivity: 'Recent activity',
    viewAll: 'View all',
    upcomingExams: 'Upcoming exams',
    
    // Books
    buyBook: 'Buy book',
    downloadBook: 'Download',
    readOnline: 'Read online',
    bookDetails: 'Book details',
    includedInPlan: 'Included in your subscription',
    purchaseSeparately: 'Purchase separately',
    freeWithSubscription: 'FREE with subscription',
    pages: 'pages',
    format: 'Format',
    preview: 'Preview',
    
    // Exams
    startExam: 'Start exam',
    viewResults: 'View results',
    duration: 'Duration',
    questions: 'questions',
    difficulty: 'Difficulty',
    date: 'Date',
    subject: 'Subject',
    progressOverview: 'Progress overview',
    
    // Common
    backToHome: 'Back to home',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    search: 'Search...',
    filter: 'Filter',
    all: 'All',
    seeMore: 'See more',
    startNow: 'Start now'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [storedLanguage, setStoredLanguage] = useLocalStorage<Language>('preferred-language', 'fr');
  const [language, setLanguage] = useState<Language>(storedLanguage);

  useEffect(() => {
    setLanguage(storedLanguage);
  }, [storedLanguage]);

  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
    setStoredLanguage(newLang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};