import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import themeManager from '../../utils/themeManager';
import StoryContent from './components/StoryContent';
import ActionButtons from './components/ActionButtons';
import BookmarkButton from './components/BookmarkButton';
import ProgressIndicator from './components/ProgressIndicator';

const StoryDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { story } = location.state || {};
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());
  const [currentUser, setCurrentUser] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login-screen');
      return;
    }
    setCurrentUser(JSON.parse(userData));

    // Redirect if no story data
    if (!story) {
      navigate('/short-stories-list-screen');
      return;
    }

    // Check if story is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
    setIsBookmarked(bookmarks.some(bookmark => bookmark.id === story.id));

    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, [navigate, story]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackClick = () => {
    navigate('/short-stories-list-screen');
  };

  const handleBookmarkToggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
    
    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== story.id);
      localStorage.setItem('bookmarkedStories', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      // Add bookmark
      const newBookmark = {
        id: story.id,
        title: story.title,
        snippet: story.snippet,
        bookmarkedAt: new Date().toISOString()
      };
      bookmarks.push(newBookmark);
      localStorage.setItem('bookmarkedStories', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  const handleAskPanda = () => {
    // Navigate to chat with pre-populated message
    navigate('/main-chat-interface', { 
      state: { 
        autoMessage: '你能告诉我这个故事的意思吗？',
        storyContext: story.title
      }
    });
  };

  const handleSummarize = () => {
    // Navigate to chat with pre-populated message
    navigate('/main-chat-interface', { 
      state: { 
        autoMessage: '请用简单的话给我讲讲这个故事 🐼✨ 嘻嘻',
        storyContext: story.title
      }
    });
  };

  if (!currentUser || !story) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeConfig.background }}>
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🐼</div>
          <p className="text-lg" style={{ color: themeConfig.textSecondary }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeConfig.background }}>
      <AppHeader />
      
      {/* Progress Indicator */}
      <ProgressIndicator progress={readingProgress} themeConfig={themeConfig} />
      
      {/* Header Section */}
      <div className="sticky top-0 z-10 px-4 py-3 border-b" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={handleBackClick}
              className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
              style={{ backgroundColor: themeConfig.primary, color: 'white' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold" style={{ color: themeConfig.textPrimary }}>
                {story.title}
              </h1>
              <p className="text-sm" style={{ color: themeConfig.textSecondary }}>
                {story.difficulty} • {story.readingTime}
              </p>
            </div>
          </div>
          
          <BookmarkButton 
            isBookmarked={isBookmarked}
            onToggle={handleBookmarkToggle}
            themeConfig={themeConfig}
          />
        </div>
      </div>

      {/* Story Content */}
      <StoryContent story={story} themeConfig={themeConfig} />

      {/* Action Buttons */}
      <ActionButtons 
        onAskPanda={handleAskPanda}
        onSummarize={handleSummarize}
        themeConfig={themeConfig}
      />

      {/* Footer */}
      <footer className="py-3 px-4 text-center border-t mt-8" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
        <p className="text-xs" style={{ color: themeConfig.textSecondary }}>
          Powered by Zeal Education
        </p>
      </footer>
    </div>
  );
};

export default StoryDetailScreen;