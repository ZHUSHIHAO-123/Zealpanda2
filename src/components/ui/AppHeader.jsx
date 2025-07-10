import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import themeManager from '../../utils/themeManager';

import NavigationMenuComponent from '../../pages/navigation-menu-component';

const AppHeader = () => {
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

  const handleLogoClick = () => {
    navigate('/main-chat-interface');
  };

  return (
    <header className="sticky top-0 z-40 border-b transition-all duration-300" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Navigation Menu */}
          <div className="flex items-center space-x-3">
            <NavigationMenuComponent />
            
            {/* Logo and Brand */}
            <div 
              className="flex items-center space-x-3 cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={handleLogoClick}
            >
              <div className="text-2xl animate-pulse">🐼</div>
              <div>
                <h1 className="font-bold text-lg leading-tight" style={{ color: themeConfig.textPrimary }}>
                  Zeal Panda
                </h1>
                <p className="text-xs leading-tight" style={{ color: themeConfig.textSecondary }}>
                  Chinese Learning Assistant
                </p>
              </div>
            </div>
          </div>

          {/* Right side actions - can be customized per page */}
          <div className="flex items-center space-x-2">
            {/* Theme switching could be added here in the future */}
            <div className="hidden sm:block">
              <div className="text-sm" style={{ color: themeConfig.textSecondary }}>
                {themeConfig.name} {themeConfig.emoji}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;