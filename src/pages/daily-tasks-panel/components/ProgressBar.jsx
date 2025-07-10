import React from 'react';

const ProgressBar = ({ completed, total, showSparkles = false }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-heading font-semibold text-gray-800">
          Daily Progress
        </span>
        <span className="text-sm text-gray-600 font-medium">
          {completed}/{total} tasks
        </span>
      </div>
      
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-700 ease-out ${
            percentage === 100 
              ? 'bg-gradient-to-r from-green-400 to-green-500' :'bg-gradient-to-r from-pink-400 to-pink-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Sparkle Effect */}
        {showSparkles && percentage > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse">
              <span className="text-white text-xs font-bold">✨</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500">
          {percentage === 100 
            ? '🎉 All tasks completed! Your panda is so proud!' 
            : `${Math.round(percentage)}% complete - Keep going!`
          }
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;