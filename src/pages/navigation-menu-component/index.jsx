import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Book, Settings } from 'lucide-react';
import themeManager from '../../utils/themeManager';
import Icon from '../../components/AppIcon';


const NavigationMenuComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const menuItems = [
    {
      id: 'chat',
      label: 'Chat with Panda',
      path: '/main-chat-interface',
      icon: MessageCircle,
      description: 'Chat with your panda friend'
    },
    {
      id: 'stories',
      label: 'Explore Stories',
      path: '/short-stories',
      description: 'Read Chinese short stories'
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings-screen',
      icon: Settings,
      description: 'Customize your experience'
    }
  ];

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ 
          color: themeConfig.textSecondary,
          backgroundColor: isMenuOpen ? themeConfig.primary : 'transparent',
          focusRingColor: themeConfig.primary
        }}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Navigation Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-full z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: themeConfig.surface }}
      >
        <div className="h-full flex flex-col shadow-xl border-r" style={{ borderColor: themeConfig.border }}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: themeConfig.border }}>
            <div className="flex items-center space-x-3">
              <div className="text-2xl animate-pulse">🐼</div>
              <div>
                <h2 className="font-bold text-lg" style={{ color: themeConfig.textPrimary }}>
                  Zeal Panda
                </h2>
                <p className="text-xs" style={{ color: themeConfig.textSecondary }}>
                  Navigation Menu
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
              style={{ color: themeConfig.textSecondary }}
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isCurrent = isCurrentPage(item.path);
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isCurrent ? 'shadow-md' : 'hover:shadow-sm'
                    }`}
                    style={{
                      backgroundColor: isCurrent ? themeConfig.primary : 'transparent',
                      color: isCurrent ? 'white' : themeConfig.textPrimary,
                      focusRingColor: themeConfig.primary
                    }}
                  >
                    <div className="flex-shrink-0">
                      {Icon ? (
                        <Icon size={20} />
                      ) : item.id === 'stories' ? (
                        <Book size={20} />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {item.label}
                      </div>
                      <div 
                        className="text-xs truncate mt-1"
                        style={{ 
                          color: isCurrent ? 'rgba(255, 255, 255, 0.8)' : themeConfig.textSecondary 
                        }}
                      >
                        {item.description}
                      </div>
                    </div>
                    {isCurrent && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t" style={{ borderColor: themeConfig.border }}>
            <div className="text-center">
              <div className="text-lg mb-2">🐼</div>
              <p className="text-xs font-medium mb-1" style={{ color: themeConfig.textPrimary }}>
                Zeal Panda
              </p>
              <p className="text-xs" style={{ color: themeConfig.textSecondary }}>
                Chinese Learning Assistant
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenuComponent;