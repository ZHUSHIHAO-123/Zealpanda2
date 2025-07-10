import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import themeManager from '../../../utils/themeManager';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());
  const textareaRef = useRef(null);

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="sticky bottom-0 p-4" style={{ backgroundColor: themeConfig.surface }}>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message in Chinese or English..."
              className="w-full px-4 py-3 rounded-2xl border-2 resize-none focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
              style={{
                backgroundColor: themeConfig.background,
                borderColor: themeConfig.border,
                color: themeConfig.textPrimary,
                focusRingColor: themeConfig.primary
              }}
              rows="1"
              maxLength={500}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!message.trim() || isLoading}
            className="p-3 rounded-2xl text-white font-semibold transition-all duration-200 flex items-center justify-center"
            style={{
              background: message.trim() && !isLoading 
                ? `linear-gradient(135deg, ${themeConfig.primary}, ${themeConfig.accent})`
                : themeConfig.border,
              minWidth: '52px',
              height: '52px'
            }}
          >
            {isLoading ? (
              <Icon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <Icon name="Send" size={20} />
            )}
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={() => setMessage('这是什么意思？')}
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200"
            style={{
              backgroundColor: `${themeConfig.primary}20`,
              color: themeConfig.primary,
              border: `1px solid ${themeConfig.primary}40`
            }}
          >
            这是什么意思？
          </button>
          <button
            type="button"
            onClick={() => setMessage('你好！')}
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200"
            style={{
              backgroundColor: `${themeConfig.secondary}20`,
              color: themeConfig.textPrimary,
              border: `1px solid ${themeConfig.secondary}40`
            }}
          >
            你好！
          </button>
          <button
            type="button"
            onClick={() => setMessage('完成了')}
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200"
            style={{
              backgroundColor: `${themeConfig.accent}20`,
              color: themeConfig.accent,
              border: `1px solid ${themeConfig.accent}40`
            }}
          >
            完成了
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;