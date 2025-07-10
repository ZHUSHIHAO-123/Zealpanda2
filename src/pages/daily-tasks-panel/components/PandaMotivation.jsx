import React, { useState, useEffect } from 'react';

const PandaMotivation = ({ completedTasks, totalTasks }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [pandaEmoji, setPandaEmoji] = useState('🐼');

  const motivationalMessages = [
    {
      condition: (completed, total) => completed === 0,
      message: "Let\'s start our Chinese adventure together today!",
      emoji: '🐼✨'
    },
    {
      condition: (completed, total) => completed === 1,
      message: "Great start! You're doing amazing!",
      emoji: '🐼❤️'
    },
    {
      condition: (completed, total) => completed > 1 && completed < total,
      message: `Wonderful progress! Only ${totalTasks - completedTasks} more to go!`,
      emoji: '🐼🌟'
    },
    {
      condition: (completed, total) => completed === total && total > 0,
      message: "Incredible! You completed all tasks today!",
      emoji: '🐼🏆'
    }
  ];

  useEffect(() => {
    const matchingMessage = motivationalMessages.find(msg => 
      msg.condition(completedTasks, totalTasks)
    );
    
    if (matchingMessage) {
      setCurrentMessage(matchingMessage.message);
      setPandaEmoji(matchingMessage.emoji);
    }
  }, [completedTasks, totalTasks]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl p-4 border-2 border-blue-200">
      <div className="flex items-center space-x-3">
        <div className="text-3xl animate-bounce">
          {pandaEmoji}
        </div>
        <div className="flex-1">
          <p className="font-heading font-semibold text-gray-800 text-sm">
            {currentMessage}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Your panda friend believes in you! Keep practicing Chinese! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default PandaMotivation;