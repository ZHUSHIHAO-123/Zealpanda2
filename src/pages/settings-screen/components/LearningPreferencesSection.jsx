import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const LearningPreferencesSection = () => {
  const [responseComplexity, setResponseComplexity] = useState('simple');
  const [taskDifficulty, setTaskDifficulty] = useState('easy');
  const [showPinyin, setShowPinyin] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState('normal');

  useEffect(() => {
    // Load preferences from localStorage
    const savedComplexity = localStorage.getItem('responseComplexity') || 'simple';
    const savedDifficulty = localStorage.getItem('taskDifficulty') || 'easy';
    const savedPinyin = localStorage.getItem('showPinyin') === 'true';
    const savedSpeed = localStorage.getItem('voiceSpeed') || 'normal';

    setResponseComplexity(savedComplexity);
    setTaskDifficulty(savedDifficulty);
    setShowPinyin(savedPinyin);
    setVoiceSpeed(savedSpeed);
  }, []);

  const handleComplexityChange = (complexity) => {
    setResponseComplexity(complexity);
    localStorage.setItem('responseComplexity', complexity);
  };

  const handleDifficultyChange = (difficulty) => {
    setTaskDifficulty(difficulty);
    localStorage.setItem('taskDifficulty', difficulty);
  };

  const handlePinyinToggle = () => {
    const newValue = !showPinyin;
    setShowPinyin(newValue);
    localStorage.setItem('showPinyin', newValue.toString());
  };

  const handleSpeedChange = (speed) => {
    setVoiceSpeed(speed);
    localStorage.setItem('voiceSpeed', speed);
  };

  const complexityOptions = [
    { value: 'simple', label: 'Simple', description: 'Basic words and short sentences', icon: '🌱' },
    { value: 'medium', label: 'Medium', description: 'More vocabulary and longer sentences', icon: '🌿' },
    { value: 'advanced', label: 'Advanced', description: 'Complex grammar and expressions', icon: '🌳' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', description: 'Basic practice tasks', icon: '😊' },
    { value: 'medium', label: 'Medium', description: 'Moderate challenges', icon: '🤔' },
    { value: 'hard', label: 'Hard', description: 'Advanced exercises', icon: '💪' }
  ];

  const speedOptions = [
    { value: 'slow', label: 'Slow', icon: '🐌' },
    { value: 'normal', label: 'Normal', icon: '🐼' },
    { value: 'fast', label: 'Fast', icon: '🚀' }
  ];

  return (
    <div className="bg-background rounded-child-friendly-lg p-6 shadow-warm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-child-friendly flex items-center justify-center">
          <Icon name="BookOpen" size={20} className="text-white" />
        </div>
        <h2 className="font-heading font-heading-bold text-lg text-text-primary">
          Learning Preferences
        </h2>
      </div>

      {/* AI Response Complexity */}
      <div className="mb-6">
        <label className="block font-body font-body-medium text-sm text-text-primary mb-3">
          AI Response Complexity
        </label>
        <div className="space-y-2">
          {complexityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleComplexityChange(option.value)}
              className={`w-full p-4 rounded-child-friendly border-2 transition-gentle text-left ${
                responseComplexity === option.value
                  ? 'border-primary bg-primary bg-opacity-10' :'border-border bg-surface hover:border-primary hover:border-opacity-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{option.icon}</span>
                <div className="flex-1">
                  <div className="font-body font-body-semibold text-text-primary">
                    {option.label}
                  </div>
                  <div className="font-caption text-sm text-text-secondary">
                    {option.description}
                  </div>
                </div>
                {responseComplexity === option.value && (
                  <Icon name="Check" size={20} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Task Difficulty */}
      <div className="mb-6">
        <label className="block font-body font-body-medium text-sm text-text-primary mb-3">
          Daily Task Difficulty
        </label>
        <div className="space-y-2">
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleDifficultyChange(option.value)}
              className={`w-full p-4 rounded-child-friendly border-2 transition-gentle text-left ${
                taskDifficulty === option.value
                  ? 'border-secondary bg-secondary bg-opacity-10' :'border-border bg-surface hover:border-secondary hover:border-opacity-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{option.icon}</span>
                <div className="flex-1">
                  <div className="font-body font-body-semibold text-text-primary">
                    {option.label}
                  </div>
                  <div className="font-caption text-sm text-text-secondary">
                    {option.description}
                  </div>
                </div>
                {taskDifficulty === option.value && (
                  <Icon name="Check" size={20} className="text-secondary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Show Pinyin Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-surface rounded-child-friendly">
          <div className="flex items-center space-x-3">
            <span className="text-xl">📝</span>
            <div>
              <div className="font-body font-body-semibold text-text-primary">
                Show Pinyin
              </div>
              <div className="font-caption text-sm text-text-secondary">
                Display pronunciation guide for Chinese characters
              </div>
            </div>
          </div>
          <button
            onClick={handlePinyinToggle}
            className={`w-12 h-6 rounded-full transition-gentle relative ${
              showPinyin ? 'bg-primary' : 'bg-border'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
              showPinyin ? 'translate-x-6' : 'translate-x-0.5'
            }`}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs">
                  {showPinyin ? '🐼' : '😴'}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Voice Speed */}
      <div>
        <label className="block font-body font-body-medium text-sm text-text-primary mb-3">
          Voice Speed
        </label>
        <div className="grid grid-cols-3 gap-2">
          {speedOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSpeedChange(option.value)}
              className={`p-3 rounded-child-friendly border-2 transition-gentle ${
                voiceSpeed === option.value
                  ? 'border-accent bg-accent bg-opacity-10' :'border-border bg-surface hover:border-accent hover:border-opacity-50'
              }`}
            >
              <div className="text-center">
                <div className="text-xl mb-1">{option.icon}</div>
                <div className={`font-body font-body-medium text-sm ${
                  voiceSpeed === option.value ? 'text-accent' : 'text-text-primary'
                }`}>
                  {option.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPreferencesSection;