import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySafetySection = () => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetStep, setResetStep] = useState(0);
  const [parentalControls, setParentalControls] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleParentalControlsToggle = () => {
    const newValue = !parentalControls;
    setParentalControls(newValue);
    localStorage.setItem('parentalControls', newValue.toString());
  };

  const handleDataSharingToggle = () => {
    const newValue = !dataSharing;
    setDataSharing(newValue);
    localStorage.setItem('dataSharing', newValue.toString());
  };

  const handleResetProgress = () => {
    if (resetStep === 0) {
      setResetStep(1);
      return;
    }

    if (resetStep === 1) {
      setResetStep(2);
      return;
    }

    // Final confirmation - actually reset progress
    const progressKeys = ['pandaPetLevel', 'pandaPetMood', 'userDisplayName'];
    progressKeys.forEach(key => {
      localStorage.removeItem(key);
    });

    // Clear completed tasks
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith('completedTasks_')) {
        localStorage.removeItem(key);
      }
    });

    // Reset to defaults
    localStorage.setItem('pandaPetLevel', '1');
    localStorage.setItem('pandaPetMood', 'happy');
    localStorage.setItem('userDisplayName', 'Young Learner');

    setShowResetConfirm(false);
    setResetStep(0);

    // Show success message
    alert('Progress reset successfully! Your panda is ready for a fresh start! 🐼✨');
  };

  const resetSteps = [
    {
      title: 'Reset Learning Progress?',
      message: 'This will reset your pet level and completed tasks.',
      emoji: '🤔',
      buttonText: 'Continue',
      buttonVariant: 'warning'
    },
    {
      title: 'Are you absolutely sure?',
      message: 'Your panda will go back to Level 1 and all achievements will be lost.',
      emoji: '😰',
      buttonText: 'Yes, Reset Everything',
      buttonVariant: 'danger'
    },
    {
      title: 'Final Confirmation',
      message: 'This action cannot be undone. Your panda will start fresh!',
      emoji: '🐼💔',
      buttonText: 'Reset Now',
      buttonVariant: 'danger'
    }
  ];

  return (
    <div className="bg-background rounded-child-friendly-lg p-6 shadow-warm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-success to-primary rounded-child-friendly flex items-center justify-center">
          <Icon name="ShieldCheck" size={20} className="text-white" />
        </div>
        <h2 className="font-heading font-heading-bold text-lg text-text-primary">
          Privacy &amp; Safety
        </h2>
      </div>

      {/* Parental Controls */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-surface rounded-child-friendly">
          <div className="flex items-center space-x-3">
            <span className="text-xl">👨‍👩‍👧‍👦</span>
            <div>
              <div className="font-body font-body-semibold text-text-primary">
                Parental Controls
              </div>
              <div className="font-caption text-sm text-text-secondary">
                Enable safe learning environment for children
              </div>
            </div>
          </div>
          <button
            onClick={handleParentalControlsToggle}
            className={`w-12 h-6 rounded-full transition-gentle relative ${
              parentalControls ? 'bg-success' : 'bg-border'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
              parentalControls ? 'translate-x-6' : 'translate-x-0.5'
            }`}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs">
                  {parentalControls ? '🛡️' : '🔓'}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-surface rounded-child-friendly">
          <div className="flex items-center space-x-3">
            <span className="text-xl">📊</span>
            <div>
              <div className="font-body font-body-semibold text-text-primary">
                Learning Analytics
              </div>
              <div className="font-caption text-sm text-text-secondary">
                Share anonymous learning data to improve the app
              </div>
            </div>
          </div>
          <button
            onClick={handleDataSharingToggle}
            className={`w-12 h-6 rounded-full transition-gentle relative ${
              dataSharing ? 'bg-primary' : 'bg-border'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
              dataSharing ? 'translate-x-6' : 'translate-x-0.5'
            }`}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs">
                  {dataSharing ? '📈' : '🔒'}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="mb-6">
        <button className="w-full p-4 bg-surface rounded-child-friendly hover:bg-border transition-gentle text-left">
          <div className="flex items-center space-x-3">
            <Icon name="Download" size={20} className="text-text-secondary" />
            <div>
              <div className="font-body font-body-semibold text-text-primary">
                Export Learning Data
              </div>
              <div className="font-caption text-sm text-text-secondary">
                Download your progress and chat history
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-text-secondary ml-auto" />
          </div>
        </button>
      </div>

      {/* Reset Progress */}
      <div>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full p-4 bg-error bg-opacity-10 border border-error border-opacity-30 rounded-child-friendly hover:bg-error hover:bg-opacity-20 transition-gentle text-left"
          >
            <div className="flex items-center space-x-3">
              <Icon name="RotateCcw" size={20} className="text-error" />
              <div>
                <div className="font-body font-body-semibold text-error">
                  Reset Learning Progress
                </div>
                <div className="font-caption text-sm text-text-secondary">
                  Start fresh with your panda companion
                </div>
              </div>
            </div>
          </button>
        ) : (
          <div className="p-4 bg-error bg-opacity-10 border border-error border-opacity-30 rounded-child-friendly">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{resetSteps[resetStep].emoji}</div>
              <h3 className="font-heading font-heading-bold text-lg text-text-primary mb-2">
                {resetSteps[resetStep].title}
              </h3>
              <p className="font-body text-sm text-text-secondary">
                {resetSteps[resetStep].message}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={resetSteps[resetStep].buttonVariant}
                onClick={handleResetProgress}
                iconName={resetStep === 2 ? "Trash2" : "AlertTriangle"}
                iconSize={16}
                className="flex-1"
              >
                {resetSteps[resetStep].buttonText}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowResetConfirm(false);
                  setResetStep(0);
                }}
                iconName="X"
                iconSize={16}
              >
                Cancel
              </Button>
            </div>

            {resetStep < 2 && (
              <div className="mt-3 p-3 bg-warning bg-opacity-10 rounded-child-friendly">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-warning mt-0.5" />
                  <p className="font-caption text-xs text-warning">
                    Step {resetStep + 1} of 3: Multiple confirmations prevent accidental resets
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacySafetySection;