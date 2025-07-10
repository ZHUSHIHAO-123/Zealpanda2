/**
 * Enhanced Theme Manager for Zeal Panda App
 * Manages theme switching between pink, light blue, and dark blue themes
 * with improved global update capabilities
 */

export const THEMES = {
  PINK: 'pink',
  LIGHT_BLUE: 'light_blue', 
  DARK_BLUE: 'dark_blue'
};

export const THEME_CONFIGS = {
  [THEMES.PINK]: {
    name: 'Pink Panda',
    primary: '#FF6B9D',
    secondary: '#FFB6C1', 
    accent: '#FF1493',
    background: '#FFF8F8',
    surface: '#FFFFFF',
    gradient: 'from-pink-50 to-rose-50',
    headerGradient: 'from-pink-400 to-pink-600',
    buttonGradient: 'from-pink-500 to-pink-600',
    buttonHover: '#FF1493',
    textPrimary: '#2D3748',
    textSecondary: '#718096',
    border: '#F8D7DA',
    chatBubbleUser: '#FF6B9D',
    chatBubbleBot: '#FFB6C1',
    inputBorder: '#FF6B9D',
    inputFocus: '#FF1493',
    emoji: '🌸'
  },
  [THEMES.LIGHT_BLUE]: {
    name: 'Sky Panda',
    primary: '#60A5FA',
    secondary: '#93C5FD',
    accent: '#3B82F6', 
    background: '#F0F9FF',
    surface: '#FFFFFF',
    gradient: 'from-blue-50 to-sky-50',
    headerGradient: 'from-blue-400 to-blue-600',
    buttonGradient: 'from-blue-500 to-blue-600',
    buttonHover: '#3B82F6',
    textPrimary: '#1E3A8A',
    textSecondary: '#64748B',
    border: '#DBEAFE',
    chatBubbleUser: '#60A5FA',
    chatBubbleBot: '#93C5FD',
    inputBorder: '#60A5FA',
    inputFocus: '#3B82F6',
    emoji: '💙'
  },
  [THEMES.DARK_BLUE]: {
    name: 'Ocean Panda',
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#1D4ED8',
    background: '#F8FAFC',
    surface: '#FFFFFF', 
    gradient: 'from-slate-50 to-blue-50',
    headerGradient: 'from-blue-700 to-blue-900',
    buttonGradient: 'from-blue-700 to-blue-800',
    buttonHover: '#1D4ED8',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    border: '#CBD5E1',
    chatBubbleUser: '#1E40AF',
    chatBubbleBot: '#3B82F6',
    inputBorder: '#1E40AF',
    inputFocus: '#1D4ED8',
    emoji: '🌊'
  }
};

class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || THEMES.PINK;
    this.applyTheme(this.currentTheme);
  }

  /**
   * Get stored theme from localStorage
   * @returns {string} Stored theme or null
   */
  getStoredTheme() {
    return localStorage.getItem('zealPandaTheme');
  }

  /**
   * Get current active theme
   * @returns {string} Current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Get theme configuration
   * @param {string} theme - Theme name
   * @returns {object} Theme configuration
   */
  getThemeConfig(theme = this.currentTheme) {
    return THEME_CONFIGS[theme] || THEME_CONFIGS[THEMES.PINK];
  }

  /**
   * Apply theme to the document with enhanced global updates
   * @param {string} theme - Theme to apply
   */
  applyTheme(theme) {
    if (!THEME_CONFIGS[theme]) {
      console.warn(`Theme ${theme} not found, using default pink theme`);
      theme = THEMES.PINK;
    }

    const config = THEME_CONFIGS[theme];
    const root = document.documentElement;

    // Apply enhanced CSS custom properties for complete theme coverage
    root.style.setProperty('--color-primary', config.primary);
    root.style.setProperty('--color-secondary', config.secondary);
    root.style.setProperty('--color-accent', config.accent);
    root.style.setProperty('--color-background', config.background);
    root.style.setProperty('--color-surface', config.surface);
    root.style.setProperty('--color-text-primary', config.textPrimary);
    root.style.setProperty('--color-text-secondary', config.textSecondary);
    root.style.setProperty('--color-border', config.border);
    root.style.setProperty('--color-button-hover', config.buttonHover);
    root.style.setProperty('--color-chat-bubble-user', config.chatBubbleUser);
    root.style.setProperty('--color-chat-bubble-bot', config.chatBubbleBot);
    root.style.setProperty('--color-input-border', config.inputBorder);
    root.style.setProperty('--color-input-focus', config.inputFocus);

    // Apply gradient classes
    root.style.setProperty('--gradient-background', config.gradient);
    root.style.setProperty('--gradient-header', config.headerGradient);
    root.style.setProperty('--gradient-button', config.buttonGradient);

    // Store current theme
    this.currentTheme = theme;
    localStorage.setItem('zealPandaTheme', theme);

    // Force immediate visual update
    document.body.style.transition = 'all 0.3s ease';
    document.body.style.backgroundColor = config.background;
    document.body.style.color = config.textPrimary;

    // Dispatch enhanced theme change event with immediate update trigger
    const themeChangeEvent = new CustomEvent('themeChange', { 
      detail: { theme, config } 
    });
    window.dispatchEvent(themeChangeEvent);

    // Force re-render of all components by triggering a global update
    setTimeout(() => {
      const globalUpdateEvent = new CustomEvent('globalThemeUpdate', {
        detail: { theme, config }
      });
      window.dispatchEvent(globalUpdateEvent);
    }, 0);
  }

  /**
   * Switch to a specific theme with enhanced global updates
   * @param {string} theme - Theme to switch to
   */
  switchTheme(theme) {
    if (THEME_CONFIGS[theme]) {
      this.applyTheme(theme);
      
      // Additional global update for immediate visual feedback
      this.triggerGlobalUpdate(theme);
    }
  }

  /**
   * Trigger global theme update across all components
   * @param {string} theme - Theme to update to
   */
  triggerGlobalUpdate(theme) {
    const config = THEME_CONFIGS[theme];
    
    // Update all elements with data-theme attribute
    const themedElements = document.querySelectorAll('[data-theme]');
    themedElements.forEach(element => {
      element.setAttribute('data-theme', theme);
    });

    // Force update of all styled components
    const styledElements = document.querySelectorAll('[style*="color"], [style*="background"]');
    styledElements.forEach(element => {
      element.style.transition = 'all 0.3s ease';
    });

    // Trigger a forced repaint
    document.body.offsetHeight;
  }

  /**
   * Get all available themes
   * @returns {array} Array of theme objects
   */
  getAvailableThemes() {
    return Object.keys(THEME_CONFIGS).map(key => ({
      id: key,
      ...THEME_CONFIGS[key]
    }));
  }

  /**
   * Reset theme to default (pink)
   */
  resetToDefault() {
    this.applyTheme(THEMES.PINK);
  }
}

export default new ThemeManager();