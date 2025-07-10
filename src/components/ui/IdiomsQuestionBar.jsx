import React, { useState, useEffect } from 'react';
import themeManager from '../../utils/themeManager';

const IdiomsQuestionBar = ({ onQuestionClick }) => {
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());
  
  const idiomQuestions = [
    "你知道杯弓蛇影是什么意思吗？",
    "你知道狐假虎威是什么意思吗？",
    "你知道亡羊补牢是什么意思吗？",
    "你知道画蛇添足是什么意思吗？",
    "你知道井底之蛙是什么意思吗？",
    "你知道对牛弹琴是什么意思吗？",
    "你知道守株待兔是什么意思吗？",
    "你知道刻舟求剑是什么意思吗？",
    "你知道掩耳盗铃是什么意思吗？",
    "你知道自相矛盾是什么意思吗？"
  ];

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const handleQuestionClick = (question) => {
    if (onQuestionClick) {
      onQuestionClick(question);
    }
  };

  return (
    <div className="px-4 py-3 border-b" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
      <div className="flex items-center space-x-2 mb-2">
        <div className="text-lg">🐼</div>
        <h3 className="text-sm font-semibold" style={{ color: themeConfig.textPrimary }}>
          成语探索 (Idiom Explorer)
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {idiomQuestions.slice(0, 3).map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(question)}
            className="px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
            style={{
              backgroundColor: `${themeConfig.primary}15`,
              color: themeConfig.primary,
              border: `1px solid ${themeConfig.primary}30`
            }}
          >
            {question}
          </button>
        ))}
      </div>
      
      <p className="text-xs mt-2 opacity-75" style={{ color: themeConfig.textSecondary }}>
        点击问题来探索中文成语! 🎯
      </p>
    </div>
  );
};

export default IdiomsQuestionBar;