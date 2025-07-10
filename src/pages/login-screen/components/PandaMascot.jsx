import React, { useState, useEffect } from 'react';

const PandaMascot = ({ isLoading = false }) => {
  const [currentExpression, setCurrentExpression] = useState('happy');
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Animate panda expressions during loading
    if (isLoading) {
      const expressions = ['thinking', 'excited', 'happy'];
      let index = 0;
      const interval = setInterval(() => {
        setCurrentExpression(expressions[index % expressions.length]);
        index++;
      }, 800);
      return () => clearInterval(interval);
    } else {
      setCurrentExpression('happy');
    }
  }, [isLoading]);

  useEffect(() => {
    // Generate sparkles animation
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPandaExpression = () => {
    switch (currentExpression) {
      case 'thinking':
        return '🤔🐼';
      case 'excited':
        return '🐼✨';
      case 'happy':
      default:
        return '🐼❤️';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      {/* Sparkles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute text-accent opacity-60 animate-pulse"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Main Panda Avatar */}
      <div className="relative">
        <div 
          className={`text-8xl sm:text-9xl transition-all duration-500 ${
            isLoading ? 'animate-bounce' : 'hover:scale-110'
          }`}
          role="img" 
          aria-label={`Panda mascot feeling ${currentExpression}`}
        >
          {getPandaExpression()}
        </div>
        
        {/* Pulsing Ring Effect */}
        <div className="absolute inset-0 rounded-full bg-primary bg-opacity-20 animate-ping" 
             style={{ animationDuration: '3s' }} />
      </div>

      {/* Welcome Message */}
      <div className="mt-6 text-center">
        <h1 className="font-heading font-heading-bold text-2xl sm:text-3xl text-text-primary mb-2">
          Welcome to PandaChinese!
        </h1>
        <p className="font-body text-text-secondary text-sm sm:text-base max-w-xs">
          {isLoading 
            ? "Your panda friend is getting ready..." :"Let's learn Chinese together! 🌟"
          }
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -left-4 text-secondary text-2xl opacity-60 animate-pulse">
        🌸
      </div>
      <div className="absolute -top-2 -right-6 text-accent text-xl opacity-60 animate-pulse" 
           style={{ animationDelay: '1s' }}>
        🎋
      </div>
      <div className="absolute -bottom-4 -left-6 text-primary text-lg opacity-60 animate-pulse" 
           style={{ animationDelay: '2s' }}>
        🌺
      </div>
    </div>
  );
};

export default PandaMascot;