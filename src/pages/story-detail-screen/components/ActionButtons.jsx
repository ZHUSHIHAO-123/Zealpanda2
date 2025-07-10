import React from 'react';

const ActionButtons = ({ onAskPanda, onSummarize, themeConfig }) => {
  return (
    <div className="px-4 py-6">
      <div className="space-y-3">
        {/* Ask Panda Button */}
        <button
          onClick={onAskPanda}
          className="w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border-2"
          style={{ 
            backgroundColor: themeConfig.primary,
            color: 'white',
            borderColor: themeConfig.primary
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">🐼</span>
            <span className="text-lg">Ask Panda what this means</span>
            <span className="text-xl">💭</span>
          </div>
          <p className="text-sm mt-1 opacity-90">
            "你能告诉我这个故事的意思吗？"
          </p>
        </button>

        {/* Summarize Button */}
        <button
          onClick={onSummarize}
          className="w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border-2"
          style={{ 
            backgroundColor: themeConfig.surface,
            color: themeConfig.textPrimary,
            borderColor: themeConfig.primary
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">📝</span>
            <span className="text-lg">Let Panda summarize this story</span>
            <span className="text-xl">✨</span>
          </div>
          <p className="text-sm mt-1" style={{ color: themeConfig.textSecondary }}>
            "请用简单的话给我讲讲这个故事 🐼✨ 嘻嘻"
          </p>
        </button>
      </div>

      {/* Helper Text */}
      <div className="mt-6 text-center">
        <p className="text-sm" style={{ color: themeConfig.textSecondary }}>
          点击按钮和熊猫一起探讨故事含义 🎯
        </p>
      </div>
    </div>
  );
};

export default ActionButtons;