import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TasksHeader = ({ onClose, currentDate }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-pink-200">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
          <Icon name="CheckSquare" size={24} className="text-white" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-gray-800">
            Daily Tasks
          </h1>
          <p className="text-sm text-gray-600">
            {formatDate(currentDate)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="text-2xl animate-pulse">
          🐼
        </div>
        <Button
          variant="ghost"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-pink-100 transition-colors"
          iconName="X"
          iconSize={20}
        >
          <span className="sr-only">Close tasks panel</span>
        </Button>
      </div>
    </div>
  );
};

export default TasksHeader;