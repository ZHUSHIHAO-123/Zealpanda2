import React, { useState, useEffect } from 'react';
import themeManager from '../../../utils/themeManager';

const PandaAvatar = ({ mood, level, isTyping }) => {
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const getPandaDisplay = () => {
    // Calculate sparkles based on level
    const levelMultiplier = Math.floor(level / 10);
    const sparkles = '✨'.repeat(Math.min(levelMultiplier, 5));
    
    // Base panda with mood variations
    let pandaEmoji = '🐼';
    let extraEmoji = '';
    
    switch (mood) {
      case 'shy':
        pandaEmoji = '😊🐼';
        extraEmoji = '💕';
        break;
      case 'proud':
        pandaEmoji = '🐼🏆';
        extraEmoji = '🎉';
        break;
      case 'surprised':
        pandaEmoji = '😮🐼';
        extraEmoji = '💫';
        break;
      case 'happy':
      default:
        pandaEmoji = '🐼';
        extraEmoji = '❤️';
        break;
    }
    
    return `${pandaEmoji}${sparkles}${extraEmoji}`;
  };

  const getAvatarSize = () => {
    // Avatar gets slightly bigger with level
    const baseSize = 80;
    const levelBonus = Math.min(level * 2, 40);
    return baseSize + levelBonus;
  };

  const avatarSize = getAvatarSize();

  return (
    <div className="flex justify-center py-6">
      <div className="relative">
        {/* Main Avatar Container */}
        <div 
          className="rounded-full flex items-center justify-center shadow-lg transition-all duration-500"
          style={{ 
            width: `${avatarSize}px`,
            height: `${avatarSize}px`,
            background: `linear-gradient(135deg, ${themeConfig.primary}, ${themeConfig.secondary})`,
            transform: isTyping ? 'scale(1.1)' : 'scale(1)',
            border: `3px solid ${themeConfig.surface}`
          }}
        >
          <div 
            className="text-center transition-transform duration-300"
            style={{ 
              fontSize: `${Math.min(avatarSize * 0.4, 32)}px`,
              transform: isTyping ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            {getPandaDisplay()}
          </div>
        </div>

        {/* Level Badge */}
        <div 
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
          style={{ 
            background: `linear-gradient(135deg, ${themeConfig.accent}, ${themeConfig.primary})`
          }}
        >
          {level}
        </div>

        {/* Mood Indicator */}
        <div 
          className="absolute -bottom-2 -left-2 px-2 py-1 rounded-full text-xs font-medium shadow-md"
          style={{ 
            backgroundColor: themeConfig.surface,
            color: themeConfig.textPrimary,
            border: `1px solid ${themeConfig.border}`
          }}
        >
          {mood}
        </div>

        {/* Typing Animation */}
        {isTyping && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div 
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ 
                  backgroundColor: themeConfig.primary,
                  animationDelay: '0ms'
                }}
              />
              <div 
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ 
                  backgroundColor: themeConfig.primary,
                  animationDelay: '150ms'
                }}
              />
              <div 
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ 
                  backgroundColor: themeConfig.primary,
                  animationDelay: '300ms'
                }}
              />
            </div>
          </div>
        )}

        {/* Sparkle Animation for Level Growth */}
        {level > 1 && (
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-0 left-0 text-yellow-400 animate-pulse"
              style={{ 
                fontSize: '12px',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              ✨
            </div>
            <div 
              className="absolute top-2 right-0 text-yellow-400 animate-pulse"
              style={{ 
                fontSize: '10px',
                animation: 'float 3s ease-in-out infinite 1s'
              }}
            >
              ⭐
            </div>
            <div 
              className="absolute bottom-0 left-2 text-yellow-400 animate-pulse"
              style={{ 
                fontSize: '8px',
                animation: 'float 3s ease-in-out infinite 2s'
              }}
            >
              💫
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default PandaAvatar;