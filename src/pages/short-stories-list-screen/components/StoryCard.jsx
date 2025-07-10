import React from 'react';

const StoryCard = ({ story, onClick, themeConfig }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case '初级':
        return '#10B981'; // green
      case '中级':
        return '#F59E0B'; // orange
      case '高级':
        return '#EF4444'; // red
      default:
        return themeConfig.textSecondary;
    }
  };

  return (
    <div
      onClick={onClick}
      className="rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-95 border"
      style={{ 
        backgroundColor: themeConfig.surface,
        borderColor: themeConfig.border,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {/* Story Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold flex-1" style={{ color: themeConfig.textPrimary }}>
          {story.title}
        </h3>
        <span className="text-lg ml-2">🐼</span>
      </div>

      {/* Story Snippet */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: themeConfig.textSecondary }}>
        {story.snippet}
      </p>

      {/* Story Metadata */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span 
            className="text-xs px-2 py-1 rounded-full text-white font-medium"
            style={{ backgroundColor: getDifficultyColor(story.difficulty) }}
          >
            {story.difficulty}
          </span>
          <span className="text-xs flex items-center gap-1" style={{ color: themeConfig.textSecondary }}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {story.readingTime}
          </span>
        </div>
        
        <div className="flex items-center">
          <svg 
            className="w-4 h-4 transform transition-transform duration-200"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ color: themeConfig.primary }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Hover Effect Indicator */}
      <div className="mt-3 pt-3 border-t opacity-0 transition-opacity duration-200 hover:opacity-100" style={{ borderColor: themeConfig.border }}>
        <p className="text-xs text-center" style={{ color: themeConfig.primary }}>
          点击阅读完整故事 📖
        </p>
      </div>
    </div>
  );
};

export default StoryCard;