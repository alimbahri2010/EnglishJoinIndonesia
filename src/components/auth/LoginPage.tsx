import React from 'react';
import { UserRole } from '../../types';
import { AuthPage, AuthMode } from './AuthPage';

interface LoginPageProps {
  onLoginSuccess?: (role: UserRole) => void;
  onBackToLanding?: () => void;
  initialMode?: AuthMode;
  onNavigate?: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLoginSuccess, 
  onBackToLanding,
  initialMode = 'sign-in',
  onNavigate
}) => {
  return (
    <AuthPage
      initialMode={initialMode}
      onNavigate={(path) => {
        if (path === '/' && onBackToLanding) {
          onBackToLanding();
        } else if (onNavigate) {
          onNavigate(path);
        } else if (typeof window !== 'undefined') {
          window.history.pushState(null, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }}
      onSuccessRedirect={() => {
        if (onLoginSuccess) {
          onLoginSuccess('student');
        }
      }}
    />
  );
};
