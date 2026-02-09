import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import type { AuthFormData } from '../types/user';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Demo accounts for testing
  const demoAccounts = [
    { email: 'student@example.com', password: 'password123' },
    { email: 'teacher@example.com', password: 'password123' },
    { email: 'admin@example.com', password: 'password123' },
    { email: 'demo@examprep.com', password: 'demo123' },
    { email: 'test@test.com', password: 'test123' }
  ];

  const handleSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    setError('');
    
    console.log('Login attempt:', data);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if credentials match any demo account
    const isValid = demoAccounts.some(
      account => account.email === data.email && account.password === data.password
    );
    
    if (isValid) {
      console.log('Login successful!');
      
      // Store authentication state (in a real app, this would be a token)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', data.email);
      
      // Set user role based on email
      let userRole = 'student';
      if (data.email.includes('teacher')) userRole = 'teacher';
      if (data.email.includes('admin')) userRole = 'admin';
      localStorage.setItem('userRole', userRole);
      
      // Navigate to dashboard on successful login
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Try: student@example.com / password123');
    }
    
    setIsLoading(false);
  };

  // Quick login function for demo purposes
  const handleQuickLogin = (email: string, password: string) => {
    const mockEvent = {
      preventDefault: () => {}
    } as React.FormEvent;
    
    const formData: AuthFormData = {
      email,
      password,
      rememberMe: true
    };
    
    handleSubmit(formData);
  };

  return (
    <AuthLayout
      title={t('login')}
      subtitle="Access your learning dashboard"
      footerText={t('noAccount')}
      footerLink="/register"
      footerLinkText={t('register')}
    >
      {/* <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          <strong>Demo Accounts:</strong> Use any of these to login
        </p>
        
        <div className="space-y-2 mb-4">
          {demoAccounts.slice(0, 3).map((account, index) => (
            <button
              key={index}
              onClick={() => handleQuickLogin(account.email, account.password)}
              className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-sm"
            >
              <div className="font-medium">Email: {account.email}</div>
              <div className="text-gray-600">Password: {account.password}</div>
            </button>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          Or use any email/password - all will work for demo
        </div>
      </div> */}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
    </AuthLayout>
  );
};

export default LoginPage;