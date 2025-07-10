import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ErrorBoundary from '../../components/ErrorBoundary';
import AppHeader from '../../components/ui/AppHeader';

import ThemeColorSection from './components/ThemeColorSection';
import ProfileSection from './components/ProfileSection';
import LearningPreferencesSection from './components/LearningPreferencesSection';
import NotificationsSection from './components/NotificationsSection';
import PandaResetSection from './components/PandaResetSection';
import AccountSection from './components/AccountSection';
import PrivacySafetySection from './components/PrivacySafetySection';
import themeManager from '../../utils/themeManager';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen transition-all duration-300" style={{ backgroundColor: themeConfig.background }}>
        {/* Header */}
        <AppHeader />

        {/* Settings Content */}
        <main className="px-4 py-6 max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2" style={{ color: themeConfig.textPrimary }}>
              Settings
            </h1>
            <p className="text-sm" style={{ color: themeConfig.textSecondary }}>
              Customize your Zeal Panda learning experience
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
            <ProfileSection />

            {/* Theme Color Section */}
            <ThemeColorSection />

            {/* Learning Preferences Section */}
            <LearningPreferencesSection />

            {/* Notifications Section */}
            <NotificationsSection />

            {/* Panda Reset Section */}
            <PandaResetSection />

            {/* Account Section */}
            <AccountSection />

            {/* Privacy & Safety Section */}
            <PrivacySafetySection />
          </div>
        </main>

        {/* Footer with branding */}
        <footer className="py-4 px-4 text-center border-t transition-all duration-300" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
          <div className="text-center">
            <div className="text-xl mb-2">🐼</div>
            <p className="text-sm font-medium mb-1" style={{ color: themeConfig.textPrimary }}>
              Zeal Panda
            </p>
            <p className="text-xs" style={{ color: themeConfig.textSecondary }}>
              Powered by Zeal Education
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default SettingsScreen;