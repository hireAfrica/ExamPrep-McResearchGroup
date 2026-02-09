import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LANGUAGES } from '../../utils/constants';

const LanguageSelector: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
      aria-label="Change language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">{LANGUAGES[language]}</span>
    </button>
  );
};

export default LanguageSelector;