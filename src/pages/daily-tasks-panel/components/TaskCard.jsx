import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskCard = ({ task, isCompleted, onComplete, onStart }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'hard':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTaskIcon = (type) => {
    switch (type) {
      case 'conversation':
        return 'MessageCircle';
      case 'vocabulary':
        return 'BookOpen';
      case 'pronunciation':
        return 'Volume2';
      case 'writing':
        return 'PenTool';
      case 'listening':
        return 'Headphones';
      default:
        return 'Star';
    }
  };

  return (
    <div className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
      isCompleted 
        ? 'bg-green-50 border-green-200 shadow-sm' 
        : 'bg-pink-50 border-pink-200 hover:shadow-md hover:border-pink-300'
    }`}>
      <div className="flex items-start space-x-3">
        {/* Task Icon/Checkbox */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          isCompleted 
            ? 'bg-green-500 text-white' :'bg-white border-2 border-pink-300 text-pink-500'
        }`}>
          <Icon 
            name={isCompleted ? 'Check' : getTaskIcon(task.type)} 
            size={20} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Task Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-heading font-bold text-base ${
              isCompleted ? 'text-green-700 line-through' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                {task.difficulty}
              </span>
              <span className="text-yellow-600 font-bold text-sm">
                +{task.points}
              </span>
            </div>
          </div>
          
          {/* Task Description */}
          <p className={`text-sm mb-3 ${
            isCompleted ? 'text-gray-500 line-through' : 'text-gray-600'
          }`}>
            {task.description}
          </p>
          
          {/* Task Example */}
          {task.example && (
            <div className="mb-3 p-2 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Example:</p>
              <p className="text-sm text-gray-700 italic">"{task.example}"</p>
            </div>
          )}
          
          {/* Action Button */}
          {!isCompleted ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onStart(task)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              iconName="Play"
              iconPosition="left"
            >
              Start Task
            </Button>
          ) : (
            <div className="flex items-center space-x-2 text-green-600">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">
                Completed! Great job! 🎉
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;