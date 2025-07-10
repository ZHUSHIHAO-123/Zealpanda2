import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from './components/TaskCard';
import ProgressBar from './components/ProgressBar';
import PandaMotivation from './components/PandaMotivation';
import TasksHeader from './components/TasksHeader';
import Button from '../../components/ui/Button';

const DailyTasksPanel = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentDate] = useState(new Date());
  const [showSparkles, setShowSparkles] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Mock daily tasks data
  const dailyTasksData = [
    {
      id: 1,
      title: 'Morning Greeting',
      description: 'Say "你好" (Hello) to your panda friend and ask how they are feeling today',
      example: 'Try saying: 你好，熊猫！你今天好吗？',
      type: 'conversation',
      points: 10,
      difficulty: 'easy',
      completionKeyword: '完成了'
    },
    {
      id: 2,
      title: 'Learn New Vocabulary',
      description: 'Practice 5 new Chinese words related to food with your panda',
      example: 'Ask: 你最喜欢什么食物？(What food do you like most?)',
      type: 'vocabulary',
      points: 25,
      difficulty: 'medium',
      completionKeyword: '完成了'
    },
    {
      id: 3,
      title: 'Count to 10',
      description: 'Practice counting from 1 to 10 in Chinese with pronunciation help',
      example: 'Say: 一、二、三、四、五、六、七、八、九、十',
      type: 'pronunciation',
      points: 15,
      difficulty: 'easy',
      completionKeyword: '完成了'
    },
    {
      id: 4,
      title: 'Ask About Panda\'s Day',
      description: 'Have a conversation about daily activities in Chinese',
      example: 'Try asking: 你今天做了什么？(What did you do today?)',
      type: 'conversation',
      points: 20,
      difficulty: 'medium',
      completionKeyword: '完成了'
    },
    {
      id: 5,
      title: 'Practice Colors',
      description: 'Learn and practice color names in Chinese with your panda friend',
      example: 'Ask: 你最喜欢什么颜色？(What color do you like most?)',
      type: 'vocabulary',
      points: 18,
      difficulty: 'easy',
      completionKeyword: '完成了'
    }
  ];

  useEffect(() => {
    // Initialize tasks
    setTasks(dailyTasksData);

    // Load completed tasks from localStorage
    const today = currentDate.toDateString();
    const savedCompletedTasks = localStorage.getItem(`completedTasks_${today}`);
    if (savedCompletedTasks) {
      setCompletedTasks(JSON.parse(savedCompletedTasks));
    }

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login-screen');
    }
  }, [currentDate, navigate]);

  const handleTaskStart = (task) => {
    // Navigate to main chat interface with task context
    localStorage.setItem('activeTask', JSON.stringify(task));
    navigate('/main-chat-interface');
  };

  const handleTaskComplete = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      const newCompletedTasks = [...completedTasks, taskId];
      setCompletedTasks(newCompletedTasks);
      
      // Save to localStorage
      const today = currentDate.toDateString();
      localStorage.setItem(`completedTasks_${today}`, JSON.stringify(newCompletedTasks));
      
      // Show sparkle effect
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
      
      // Update pet level and mood
      const currentLevel = parseInt(localStorage.getItem('pandaPetLevel') || '1', 10);
      localStorage.setItem('pandaPetLevel', (currentLevel + 1).toString());
      
      if (newCompletedTasks.length === tasks.length) {
        localStorage.setItem('pandaPetMood', 'proud');
      } else {
        localStorage.setItem('pandaPetMood', 'happy');
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate('/main-chat-interface');
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const completedCount = completedTasks.length;
  const totalCount = tasks.length;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30" onClick={handleBackdropClick}>
      {/* Mobile-first sliding panel */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 pb-safe">
          {/* Header */}
          <TasksHeader 
            onClose={handleClose}
            currentDate={currentDate}
          />

          {/* Progress Overview */}
          <div className="mb-6">
            <ProgressBar 
              completed={completedCount}
              total={totalCount}
              showSparkles={showSparkles}
            />
          </div>

          {/* Panda Motivation */}
          <div className="mb-6">
            <PandaMotivation 
              completedTasks={completedCount}
              totalTasks={totalCount}
            />
          </div>

          {/* Tasks List */}
          <div className="space-y-4 mb-6">
            <h2 className="font-heading font-bold text-lg text-gray-800 mb-4">
              Today's Learning Tasks
            </h2>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isCompleted={completedTasks.includes(task.id)}
                onComplete={() => handleTaskComplete(task.id)}
                onStart={handleTaskStart}
              />
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/main-chat-interface')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Chat with Panda
            </Button>
            
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/settings-screen')}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              iconName="Settings"
              iconPosition="left"
            >
              Settings
            </Button>
          </div>

          {/* Completion Celebration */}
          {completedCount === totalCount && totalCount > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl border-2 border-green-200 text-center">
              <div className="text-4xl mb-2">🎉🐼🏆</div>
              <h3 className="font-heading font-bold text-green-800 mb-1">
                Amazing Work!
              </h3>
              <p className="text-sm text-green-700">
                You've completed all daily tasks! Your panda is incredibly proud of your Chinese learning progress!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyTasksPanel;