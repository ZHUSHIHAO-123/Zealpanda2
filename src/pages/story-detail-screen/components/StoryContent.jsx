import React from 'react';

const StoryContent = ({ story, themeConfig }) => {
  return (
    <div className="px-4 py-6">
      <div 
        className="rounded-lg p-6 shadow-sm border"
        style={{ 
          backgroundColor: themeConfig.surface,
          borderColor: themeConfig.border
        }}
      >
        {/* Story Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: themeConfig.textPrimary }}>
            {story.title}
          </h2>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span 
              className="px-3 py-1 rounded-full text-white font-medium"
              style={{ backgroundColor: themeConfig.primary }}
            >
              {story.difficulty}
            </span>
            <span className="flex items-center gap-1" style={{ color: themeConfig.textSecondary }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {story.readingTime}
            </span>
          </div>
        </div>

        {/* Story Content */}
        <div className="prose max-w-none">
          <p 
            className="text-lg leading-relaxed whitespace-pre-wrap select-text"
            style={{ 
              color: themeConfig.textPrimary,
              lineHeight: '1.8',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {story.content}
          </p>
        </div>

        {/* Story Metadata */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: themeConfig.border }}>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <span style={{ color: themeConfig.textSecondary }}>
                中文传统故事
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐼</span>
              <span style={{ color: themeConfig.textSecondary }}>
                和熊猫一起学习
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryContent;