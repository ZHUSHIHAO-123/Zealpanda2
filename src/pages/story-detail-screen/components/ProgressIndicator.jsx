import React from 'react';

const ProgressIndicator = ({ progress, themeConfig }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1" style={{ backgroundColor: themeConfig.border }}>
      <div 
        className="h-full transition-all duration-300 ease-out"
        style={{ 
          width: `${progress}%`,
          backgroundColor: themeConfig.primary
        }}
      />
    </div>
  );
};

export default ProgressIndicator;