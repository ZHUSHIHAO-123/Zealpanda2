import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import themeManager, { THEMES, THEME_CONFIGS } from '../../../utils/themeManager';

const ThemeColorSection = () => {
  const [selectedTheme, setSelectedTheme] = useState(themeManager.getCurrentTheme());
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());

  useEffect(() => {
    const handleThemeChange = (event) => {
      setSelectedTheme(event.detail.theme);
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const handleThemeChange = (theme) => {
    // Get current user for persistence
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      const userKey = user.email;
      
      // Store theme preference for the user
      localStorage.setItem(`userTheme_${userKey}`, theme);
    }
    
    themeManager.switchTheme(theme);
    setSelectedTheme(theme);
  };

  const themes = [
    {
      id: THEMES.PINK,
      name: 'Pink Panda',
      emoji: '🌸',
      colors: ['#FF6B9D', '#FFB6C1', '#FF1493'],
      description: 'Warm and friendly pink theme'
    },
    {
      id: THEMES.LIGHT_BLUE,
      name: 'Sky Panda', 
      emoji: '💙',
      colors: ['#60A5FA', '#93C5FD', '#3B82F6'],
      description: 'Calm and soothing light blue'
    },
    {
      id: THEMES.DARK_BLUE,
      name: 'Ocean Panda',
      emoji: '🌊', 
      colors: ['#1E40AF', '#3B82F6', '#1D4ED8'],
      description: 'Deep and focused dark blue'
    }
  ];

  return (
    <div className="rounded-3xl p-6 shadow-lg border" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
      <div className="flex items-center space-x-3 mb-6">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: `linear-gradient(to bottom right, ${themeConfig.primary}, ${themeConfig.accent})` }}
        >
          <Icon name="Palette" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-xl" style={{ color: themeConfig.textPrimary }}>
            App Color Theme
          </h2>
          <p className="text-sm" style={{ color: themeConfig.textSecondary }}>
            Choose your favorite color theme
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
              selectedTheme === theme.id
                ? 'shadow-md' 
                : 'hover:shadow-sm'
            }`}
            style={{
              borderColor: selectedTheme === theme.id ? themeConfig.primary : themeConfig.border,
              backgroundColor: selectedTheme === theme.id ? `${themeConfig.primary}10` : themeConfig.surface
            }}
          >
            <div className="flex items-center space-x-4">
              {/* Theme Preview */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{theme.emoji}</span>
                <div className="flex space-x-1">
                  {theme.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Theme Info */}
              <div className="flex-1">
                <div className="font-semibold text-lg" style={{ color: themeConfig.textPrimary }}>
                  {theme.name}
                </div>
                <div className="text-sm" style={{ color: themeConfig.textSecondary }}>
                  {theme.description}
                </div>
              </div>

              {/* Selected Indicator */}
              {selectedTheme === theme.id && (
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={20} style={{ color: themeConfig.primary }} />
                  <span className="font-semibold text-sm" style={{ color: themeConfig.primary }}>
                    Active
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Current Theme Display */}
      <div className="mt-6 p-4 rounded-2xl border" style={{ backgroundColor: themeConfig.background, borderColor: themeConfig.border }}>
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🐼</div>
          <div>
            <p className="font-semibold text-sm" style={{ color: themeConfig.textPrimary }}>
              Current Theme: {THEME_CONFIGS[selectedTheme]?.name}
            </p>
            <p className="text-xs" style={{ color: themeConfig.textSecondary }}>
              Your panda friend loves this color! {THEME_CONFIGS[selectedTheme]?.emoji}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeColorSection;