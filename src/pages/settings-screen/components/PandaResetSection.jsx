import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import themeManager from '../../../utils/themeManager';

const PandaResetSection = () => {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [themeConfig] = useState(themeManager.getThemeConfig());

  const handleResetPanda = async () => {
    setIsResetting(true);
    
    try {
      // Get current user
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        const userKey = user.email;
        
        // Reset pet level to 1
        localStorage.setItem(`pandaPetLevel_${userKey}`, '1');
        
        // Reset mood to happy
        localStorage.setItem(`pandaPetMood_${userKey}`, 'happy');
        
        // Clear chat messages with reset message
        const resetMessage = [{
          id: 1,
          content: "从头开始啦 🐼🎉",
          isUser: false,
          timestamp: new Date()
        }];
        localStorage.setItem(`chatMessages_${userKey}`, JSON.stringify(resetMessage));
        
        // Clear daily idiom task completion
        const today = new Date().toDateString();
        localStorage.removeItem(`completedTasks_${userKey}_${today}`);
        localStorage.removeItem(`lastTaskDate_${userKey}`);
        localStorage.removeItem(`currentDailyTask_${userKey}`);
        localStorage.removeItem('currentDailyIdiom');
        
        // Clear learning preferences (optional)
        // localStorage.removeItem('responseComplexity');
        // localStorage.removeItem('taskDifficulty');
        
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
        
        setResetComplete(true);
        
        // Auto redirect after showing success message
        setTimeout(() => {
          navigate('/main-chat-interface');
        }, 2000);
        
      }
    } catch (error) {
      console.error('Error resetting panda:', error);
    } finally {
      setIsResetting(false);
      setShowConfirmDialog(false);
    }
  };

  if (resetComplete) {
    return (
      <div className="rounded-3xl p-6 shadow-lg border" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🐼</div>
          <h3 className="font-bold text-xl mb-2" style={{ color: themeConfig.textPrimary }}>
            Reset Complete!
          </h3>
          <p className="mb-4" style={{ color: themeConfig.textSecondary }}>
            从头开始啦 🐼🎉
          </p>
          <p className="text-sm" style={{ color: themeConfig.textSecondary }}>
            Redirecting to chat...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl p-6 shadow-lg border" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
      <div className="flex items-center space-x-3 mb-6">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: themeConfig.primary }}
        >
          <Icon name="RefreshCw" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-xl" style={{ color: themeConfig.textPrimary }}>
            Reset Panda
          </h2>
          <p className="text-sm" style={{ color: themeConfig.textSecondary }}>
            Start fresh with your panda friend
          </p>
        </div>
      </div>

      {/* Reset Information */}
      <div className="mb-6 p-4 rounded-2xl border" style={{ backgroundColor: `${themeConfig.accent}20`, borderColor: `${themeConfig.accent}40` }}>
        <div className="flex items-start space-x-3">
          <div className="text-2xl">⚠️</div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: themeConfig.textPrimary }}>
              What will be reset:
            </h3>
            <ul className="space-y-1 text-sm" style={{ color: themeConfig.textSecondary }}>
              <li className="flex items-center space-x-2">
                <span>•</span>
                <span>Pet level will return to 1</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>•</span>
                <span>Chat conversation history</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>•</span>
                <span>Daily idiom task progress</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>•</span>
                <span>Panda mood will reset to happy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Panda Message */}
      <div className="mb-6 p-4 rounded-2xl border" style={{ backgroundColor: themeConfig.background, borderColor: themeConfig.border }}>
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🐼</div>
          <div>
            <p className="font-semibold text-sm" style={{ color: themeConfig.textPrimary }}>
              "没关系，重新开始也很有趣！嘻嘻～"
            </p>
            <p className="text-xs mt-1" style={{ color: themeConfig.textSecondary }}>
              Your panda friend is ready for a fresh start anytime!
            </p>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {!showConfirmDialog ? (
        <Button
          variant="outline"
          onClick={() => setShowConfirmDialog(true)}
          className="w-full rounded-2xl py-3 font-semibold border-2 transition-colors duration-200 hover:opacity-80"
          style={{ 
            backgroundColor: themeConfig.surface,
            borderColor: themeConfig.border,
            color: themeConfig.textPrimary
          }}
        >
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Reset My Panda
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border" style={{ backgroundColor: `${themeConfig.accent}20`, borderColor: `${themeConfig.accent}40` }}>
            <p className="font-semibold text-center text-sm" style={{ color: themeConfig.textPrimary }}>
              Are you sure you want to reset everything?
            </p>
            <p className="text-center text-xs mt-1" style={{ color: themeConfig.textSecondary }}>
              This action cannot be undone.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="rounded-2xl py-3 border-2 transition-colors duration-200 hover:opacity-80"
              style={{ 
                backgroundColor: themeConfig.surface,
                borderColor: themeConfig.border,
                color: themeConfig.textSecondary
              }}
              disabled={isResetting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleResetPanda}
              className="rounded-2xl py-3 font-semibold text-white transition-colors duration-200 hover:opacity-80"
              style={{ backgroundColor: themeConfig.accent }}
              disabled={isResetting}
            >
              {isResetting ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  <Icon name="Check" size={16} className="mr-2" />
                  Yes, Reset
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PandaResetSection;