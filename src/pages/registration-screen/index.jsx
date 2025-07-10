import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import RegistrationForm from './components/RegistrationForm';
import RegistrationSuccess from './components/RegistrationSuccess';
import PandaMascot from './components/PandaMascot';
import themeManager from '../../utils/themeManager';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/main-chat-interface');
    }

    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, [navigate]);

  const handleRegistrationComplete = () => {
    setIsRegistrationComplete(true);
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen bg-gradient-to-br transition-all duration-300 ${themeConfig.gradient} flex items-center justify-center p-4`}>
        <div className="w-full max-w-md">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">🐼</div>
            <h1 className="font-bold text-3xl mb-2 transition-colors duration-300" style={{ color: themeConfig.textPrimary }}>
              Join Zeal Panda!
            </h1>
            <p className="text-lg mb-2 transition-colors duration-300" style={{ color: themeConfig.textSecondary }}>
              Start your Chinese learning journey today
            </p>
            <p className="text-sm font-medium transition-colors duration-300" style={{ color: themeConfig.textSecondary }}>
              Powered by Zeal Education
            </p>
          </div>

          {/* Registration Form or Success */}
          <div className="rounded-3xl shadow-2xl p-8 border transition-all duration-300" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
            {isRegistrationComplete ? (
              <RegistrationSuccess />
            ) : (
              <RegistrationForm onRegistrationComplete={handleRegistrationComplete} />
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm transition-colors duration-300" style={{ color: themeConfig.textSecondary }}>
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login-screen')}
                className="font-semibold transition-colors duration-200 hover:underline"
                style={{ color: themeConfig.primary }}
              >
                Sign in here
              </button>
            </p>
          </div>

          {/* Panda Mascot */}
          <PandaMascot />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default RegistrationScreen;