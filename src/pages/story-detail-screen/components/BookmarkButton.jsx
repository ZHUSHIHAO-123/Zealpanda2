import React from 'react';

const BookmarkButton = ({ isBookmarked, onToggle, themeConfig }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
      style={{ 
        backgroundColor: isBookmarked ? themeConfig.primary : themeConfig.surface,
        color: isBookmarked ? 'white' : themeConfig.textSecondary,
        border: `2px solid ${themeConfig.border}`
      }}
    >
      {isBookmarked ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      )}
    </button>
  );
};

export default BookmarkButton;