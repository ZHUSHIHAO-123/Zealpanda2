import React, { useState, useEffect } from 'react';

const PandaMascot = ({ isRegistering = false, registrationSuccess = false }) => {
  const [currentExpression, setCurrentExpression] = useState('🐼');
  const [sparkles, setSparkles] = useState([]);

  const expressions = {
    default: '🐼',
    excited: '🐼✨',
    happy: '😊🐼',
    celebrating: '🎉🐼🎉',
    welcoming: '🤗🐼'
  };

  useEffect(() => {
    if (registrationSuccess) {
      // Celebration animation
      setCurrentExpression(expressions.celebrating);
      generateSparkles();
      
      const timer = setTimeout(() => {
        setCurrentExpression(expressions.welcoming);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (isRegistering) {
      setCurrentExpression(expressions.excited);
    } else {
      // Cycle through friendly expressions
      const expressionCycle = [
        expressions.default,
        expressions.happy,
        expressions.excited
      ];
      
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % expressionCycle.length;
        setCurrentExpression(expressionCycle[currentIndex]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRegistering, registrationSuccess]);

  const generateSparkles = () => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
    setSparkles(newSparkles);

    // Clear sparkles after animation
    setTimeout(() => setSparkles([]), 3000);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Main Panda Avatar */}
      <div className="relative">
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-warm-lg transform transition-all duration-500 hover:scale-105">
          <span 
            className="text-6xl sm:text-7xl transition-all duration-500"
            role="img" 
            aria-label="Panda mascot"
          >
            {currentExpression}
          </span>
        </div>

        {/* Sparkles Animation */}
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="absolute w-2 h-2 text-accent animate-ping"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`
            }}
          >
            ✨
          </div>
        ))}

        {/* Floating Hearts for Registration Success */}
        {registrationSuccess && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce text-error opacity-80"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              >
                ❤️
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Welcome Message */}
      <div className="mt-6 text-center">
        <h2 className="font-heading font-heading-bold text-2xl sm:text-3xl text-text-primary mb-2">
          {registrationSuccess 
            ? 'Welcome to PandaChinese!' :'Join PandaChinese!'
          }
        </h2>
        <p className="font-body text-text-secondary max-w-sm mx-auto">
          {registrationSuccess 
            ? 'Your panda friend is so excited to start learning Chinese with you! 🎉' :'Create your account and start your Chinese learning adventure with your new panda friend! 🌟'
          }
        </p>
      </div>

      {/* Encouraging Messages */}
      <div className="mt-4 px-6 py-3 bg-surface rounded-child-friendly-lg">
        <p className="font-caption text-sm text-text-secondary text-center">
          {registrationSuccess 
            ? 'Get ready for fun lessons and daily adventures!'
            : 'Safe, fun, and designed just for kids! 🛡️'
          }
        </p>
      </div>

      {/* Level Indicator Preview */}
      {!registrationSuccess && (
        <div className="mt-4 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary bg-opacity-10 rounded-child-friendly">
          <span className="text-sm font-data font-data-medium text-text-primary">
            Level 1
          </span>
          <div className="w-16 h-2 bg-surface rounded-full overflow-hidden">
            <div className="w-2 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" />
          </div>
          <span className="text-xs font-caption text-text-secondary">
            Ready to start!
          </span>
        </div>
      )}
    </div>
  );
};

export default PandaMascot;