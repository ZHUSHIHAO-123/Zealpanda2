import React, { useState, useEffect } from 'react';
import Button from './Button';
import Icon from '../AppIcon';
import themeManager from '../../utils/themeManager';

const DailyTasksOverlay = ({ isOpen, onClose, dailyTask }) => {
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className="w-full max-w-md rounded-3xl shadow-2xl p-6 relative border"
        style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 hover:opacity-80"
          style={{ backgroundColor: `${themeConfig.textSecondary}20` }}
          aria-label="Close tasks overlay"
        >
          <Icon name="X" size={20} style={{ color: themeConfig.textSecondary }} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3 animate-bounce">🐼</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: themeConfig.textPrimary }}>
            Daily Chinese Idiom
          </h2>
          <p className="text-sm" style={{ color: themeConfig.textSecondary }}>
            Learn a new idiom with your panda friend!
          </p>
        </div>

        {/* Task Content */}
        <div 
          className="rounded-2xl p-4 mb-6 border"
          style={{ 
            backgroundColor: themeConfig.background,
            borderColor: themeConfig.border
          }}
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📚</div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2" style={{ color: themeConfig.textPrimary }}>
                Today's Challenge
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: themeConfig.textSecondary }}>
                {dailyTask}
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div 
          className="rounded-2xl p-4 mb-6 border"
          style={{ 
            backgroundColor: `${themeConfig.primary}20`,
            borderColor: `${themeConfig.primary}40`
          }}
        >
          <div className="flex items-start space-x-3">
            <div className="text-xl">💡</div>
            <div>
              <h4 className="font-semibold text-sm mb-1" style={{ color: themeConfig.textPrimary }}>
                How to complete:
              </h4>
              <p className="text-xs" style={{ color: themeConfig.textSecondary }}>
                Type <span className="font-bold">"这是什么意思？"</span> to ask for the meaning and complete the task!
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            onClick={onClose}
            className="w-full py-3 font-semibold text-white rounded-2xl transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: themeConfig.primary }}
          >
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Start Learning!
          </Button>
          
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="w-full py-2 rounded-2xl border-2 transition-colors duration-200 hover:opacity-80"
            style={{ 
              backgroundColor: themeConfig.surface,
              borderColor: themeConfig.border,
              color: themeConfig.textSecondary
            }}
          >
            Maybe Later
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: themeConfig.textSecondary }}>
            Complete daily tasks to help your panda grow! 🐼✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyTasksOverlay;