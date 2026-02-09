import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span className="ml-2 text-lg font-bold text-white">ExamPrep Pro</span>
            </div>
            <p className="text-sm mb-4">Your partner for academic success</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#features" className="hover:text-white transition">{t('features')}</Link></li>
              <li><Link to="#pricing" className="hover:text-white transition">{t('pricing')}</Link></li>
              <li><Link to="/books" className="hover:text-white transition">{t('books')}</Link></li>
              <li><Link to="/exams" className="hover:text-white transition">{t('exams')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#about" className="hover:text-white transition">{t('about')}</Link></li>
              <li><Link to="#" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition">{t('privacyPolicy')}</Link></li>
              <li><Link to="#" className="hover:text-white transition">{t('termsOfService')}</Link></li>
              <li><Link to="#" className="hover:text-white transition">Cookie Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">GDPR</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ExamPrep Pro. All rights reserved.</p>
          <p className="mt-1 text-gray-500">Designed by McResearchGroup for students in Canada and worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;