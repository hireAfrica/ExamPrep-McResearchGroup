import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import type { AuthFormData } from '../types/user';

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    
    console.log('Registration data:', data);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store user data in localStorage (in a real app, this would be an API call)
    const userData = {
      email: data.email,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      createdAt: new Date().toISOString(),
      subscription: 'free' as const
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userRole', 'student');
    
    setSuccess(`Account created successfully! Welcome ${data.firstName || ''}`);
    
    // Auto-login and redirect after a brief delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
    
    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your journey to success"
      footerText={t('hasAccount')}
      footerLink="/login"
      footerLinkText={t('login')}
    >
      <div className="mb-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
          <p className="text-sm text-blue-700">
            <strong>Demo Note:</strong> Registration will work with any valid email. 
            No backend validation in this demo.
          </p>
        </div>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
    </AuthLayout>
  );
};

export default RegisterPage;