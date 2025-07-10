import React, { useState, useEffect } from 'react';
import themeManager from '../../../utils/themeManager';

const ChatMessage = ({ message, isUser, timestamp }) => {
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isUser ? 'rounded-br-sm' : 'rounded-bl-sm'
      }`} style={{
        backgroundColor: isUser ? themeConfig.primary : themeConfig.surface,
        color: isUser ? 'white' : themeConfig.textPrimary,
        border: isUser ? 'none' : `1px solid ${themeConfig.border}`
      }}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
        <p className={`text-xs mt-2 ${isUser ? 'text-white opacity-70' : ''}`} style={{
          color: isUser ? 'rgba(255, 255, 255, 0.7)' : themeConfig.textSecondary
        }}>
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;