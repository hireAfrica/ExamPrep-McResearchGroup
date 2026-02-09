import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, ChevronDown, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated: propIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [internalIsAuthenticated, setInternalIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();
  const navigate = useNavigate();

  const isAuthenticated =
    propIsAuthenticated !== undefined
      ? propIsAuthenticated
      : internalIsAuthenticated;

  useEffect(() => {
    if (propIsAuthenticated === undefined) {
      const authStatus = localStorage.getItem('isAuthenticated');
      const email = localStorage.getItem('userEmail');

      if (authStatus === 'true') {
        setInternalIsAuthenticated(true);
        setUserEmail(email || '');
      }
    }
  }, [propIsAuthenticated]);

  // ✅ Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');

    setInternalIsAuthenticated(false);
    setUserEmail('');
    setIsProfileOpen(false);
    navigate('/');
  };

  const getUserDisplayName = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed.firstName || parsed.email?.split('@')[0] || 'User';
      } catch {
        return userEmail?.split('@')[0] || 'User';
      }
    }
    return userEmail?.split('@')[0] || 'User';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              ExamPrep Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
              {t('home')}
            </Link>
            <Link to="#features" className="text-gray-700 hover:text-blue-600 transition">
              {t('features')}
            </Link>
            <Link to="#pricing" className="text-gray-700 hover:text-blue-600 transition">
              {t('pricing')}
            </Link>

            {isAuthenticated ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setIsProfileOpen(prev => !prev)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <User className="w-5 h-5" />
                  <span>{getUserDisplayName()}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      {userEmail}
                    </div>

                    <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-50">
                      {t('dashboard')}
                    </Link>
                    <Link to="/exams" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-50">
                      {t('exams')}
                    </Link>
                    <Link to="/books" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-50">
                      {t('books')}
                    </Link>
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-50">
                      {t('profile')}
                    </Link>

                    <div className="border-t border-gray-100" />

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                    >
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                >
                  {t('register')}
                </Link>
              </>
            )}

            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
              <Link to="#features" onClick={() => setIsMenuOpen(false)}>{t('features')}</Link>
              <Link to="#pricing" onClick={() => setIsMenuOpen(false)}>{t('pricing')}</Link>

              {isAuthenticated ? (
                <>
                  <div className="px-2 py-1 text-sm text-gray-500">
                    Signed in as: {getUserDisplayName()}
                  </div>

                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>{t('dashboard')}</Link>
                  <Link to="/exams" onClick={() => setIsMenuOpen(false)}>{t('exams')}</Link>
                  <Link to="/books" onClick={() => setIsMenuOpen(false)}>{t('books')}</Link>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>{t('profile')}</Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 text-left"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>{t('register')}</Link>
                </>
              )}

              <LanguageSelector />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
