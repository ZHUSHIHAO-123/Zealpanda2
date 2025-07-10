import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import themeManager from '../../../utils/themeManager';

const LevelProgressHeader = ({ level, mood }) => {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState(themeManager.getCurrentTheme());

  useEffect(() => {
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.theme);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      shy: '😳',
      proud: '😎', 
      surprised: '🤩',
      happy: '😊'
    };
    return moodEmojis[mood] || '😊';
  };

  const getMoodText = (mood) => {
    const moodTexts = {
      shy: 'Shy',
      proud: 'Proud',
      surprised: 'Surprised', 
      happy: 'Happy'
    };
    return moodTexts[mood] || 'Happy';
  };

  const themeConfig = themeManager.getThemeConfig(currentTheme);

  return (
    <div 
      className="bg-white border-b border-gray-200 shadow-sm px-4 py-3"
      style={{ 
        background: `linear-gradient(135deg, ${themeConfig.primary}, ${themeConfig.secondary})` 
      }}
    >
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Zeal Panda Title with Level */}
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🐼</div>
          <div>
            <h1 className="font-bold text-lg text-white">
              Zeal Panda - Pet Level: {level}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm opacity-90">
                Mood: {getMoodEmoji(mood)} {getMoodText(mood)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Level Progress Indicator */}
          <div className="hidden sm:flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
            <Icon name="Star" size={16} className="text-yellow-300" />
            <span className="text-white text-sm font-semibold">
              Level {level}
            </span>
          </div>

          {/* Settings Button */}
          <button
            onClick={() => navigate('/settings-screen')}
            className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200"
          >
            <Icon name="Settings" size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="mt-3 max-w-4xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="text-white text-xs opacity-80">Progress:</span>
          <div className="flex-1 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white bg-opacity-80 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((level % 10) * 10, 100)}%` }}
            />
          </div>
          <span className="text-white text-xs opacity-80">
            {level % 10}/10
          </span>
        </div>
      </div>
    </div>
  );
};

export default LevelProgressHeader;