import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ childName }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/main-chat-interface');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Hide confetti after animation
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(confettiTimer);
    };
  }, [navigate]);

  const handleStartNow = () => {
    navigate('/main-chat-interface');
  };

  return (
    <div className="relative text-center">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🎊', '✨', '🌟', '🎈'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Success Icon */}
      <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm-lg">
        <Icon name="Check" size={40} className="text-white" />
      </div>

      {/* Success Message */}
      <h2 className="font-heading font-heading-bold text-3xl text-text-primary mb-4">
        Account Created! 🎉
      </h2>

      <div className="space-y-4 mb-8">
        <p className="font-body text-lg text-text-primary">
          Welcome to PandaChinese, {childName}! 👋
        </p>
        
        <p className="font-body text-text-secondary max-w-md mx-auto">
          Your panda friend is waiting to meet you and start your Chinese learning adventure together!
        </p>

        <div className="flex items-center justify-center space-x-2 text-2xl">
          <span>🐼</span>
          <span className="animate-pulse">❤️</span>
          <span>👶</span>
        </div>
      </div>

      {/* What's Next Section */}
      <div className="bg-surface rounded-child-friendly-lg p-6 mb-8">
        <h3 className="font-heading font-heading-semibold text-lg text-text-primary mb-4">
          What's Next? 🚀
        </h3>
        
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="MessageCircle" size={16} className="text-white" />
            </div>
            <span className="font-body text-sm text-text-primary">
              Meet your panda friend and start chatting
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Target" size={16} className="text-white" />
            </div>
            <span className="font-body text-sm text-text-primary">
              Complete daily tasks to level up
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Star" size={16} className="text-white" />
            </div>
            <span className="font-body text-sm text-text-primary">
              Learn Chinese through fun conversations
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleStartNow}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Start Learning Now! 🎯
        </Button>

        <div className="flex items-center justify-center space-x-2 text-text-secondary">
          <Icon name="Clock" size={16} />
          <span className="font-caption text-sm">
            Redirecting automatically in {countdown} seconds...
          </span>
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="mt-8 p-4 bg-gradient-to-r from-success to-accent bg-opacity-10 rounded-child-friendly border border-success border-opacity-20">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="font-body font-body-semibold text-sm text-success">
            Safe Learning Environment
          </span>
        </div>
        <p className="font-caption text-xs text-text-secondary">
          PandaChinese is designed with child safety in mind. All interactions are educational and age-appropriate.
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;