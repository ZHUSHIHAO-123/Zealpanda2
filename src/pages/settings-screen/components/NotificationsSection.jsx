import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationsSection = () => {
  const [dailyReminders, setDailyReminders] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);
  const [levelUpAlerts, setLevelUpAlerts] = useState(true);
  const [reminderTime, setReminderTime] = useState('18:00');

  useEffect(() => {
    // Load notification preferences from localStorage
    const savedDailyReminders = localStorage.getItem('dailyReminders') !== 'false';
    const savedTaskNotifications = localStorage.getItem('taskNotifications') !== 'false';
    const savedLevelUpAlerts = localStorage.getItem('levelUpAlerts') !== 'false';
    const savedReminderTime = localStorage.getItem('reminderTime') || '18:00';

    setDailyReminders(savedDailyReminders);
    setTaskNotifications(savedTaskNotifications);
    setLevelUpAlerts(savedLevelUpAlerts);
    setReminderTime(savedReminderTime);
  }, []);

  const handleDailyRemindersToggle = () => {
    const newValue = !dailyReminders;
    setDailyReminders(newValue);
    localStorage.setItem('dailyReminders', newValue.toString());
  };

  const handleTaskNotificationsToggle = () => {
    const newValue = !taskNotifications;
    setTaskNotifications(newValue);
    localStorage.setItem('taskNotifications', newValue.toString());
  };

  const handleLevelUpAlertsToggle = () => {
    const newValue = !levelUpAlerts;
    setLevelUpAlerts(newValue);
    localStorage.setItem('levelUpAlerts', newValue.toString());
  };

  const handleReminderTimeChange = (e) => {
    const newTime = e.target.value;
    setReminderTime(newTime);
    localStorage.setItem('reminderTime', newTime);
  };

  const PandaToggle = ({ isOn, onToggle, onEmoji = '🐼', offEmoji = '😴' }) => (
    <button
      onClick={onToggle}
      className={`w-14 h-7 rounded-full transition-gentle relative ${
        isOn ? 'bg-primary' : 'bg-border'
      }`}
    >
      <div className={`w-6 h-6 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${
        isOn ? 'translate-x-7' : 'translate-x-0.5'
      }`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-xs">
            {isOn ? onEmoji : offEmoji}
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <div className="bg-background rounded-child-friendly-lg p-6 shadow-warm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-warning to-accent rounded-child-friendly flex items-center justify-center">
          <Icon name="Bell" size={20} className="text-white" />
        </div>
        <h2 className="font-heading font-heading-bold text-lg text-text-primary">
          Notifications
        </h2>
      </div>

      {/* Daily Reminders */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-surface rounded-child-friendly">
          <div className="flex items-center space-x-3">
            <span className="text-xl">📅</span>
            <div>
              <div className="font-body font-body-semibold text-text-primary">
                Daily Learning Reminders
              </div>
              <div className="font-caption text-sm text-text-secondary">
                Get reminded to practice with your panda
              </div>
            </div>
          </div>
          <PandaToggle 
            isOn={dailyReminders} 
            onToggle={handleDailyRemindersToggle}
            onEmoji="🔔"
            offEmoji="🔕"
          />
        </div>

        {/* Reminder Time Picker */}
        {dailyReminders && (
          <div className="mt-3 p-4 bg-primary bg-opacity-5 rounded-child-friendly border border-primary border-opacity-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="font-body font-body-medium text-sm text-text-primary">
                  Reminder Time
                </span>
              </div>
              <input
                type="time"
                value={reminderTime}
                onChange={handleReminderTimeChange}
                className="px-3 py-2 bg-background border border-border rounded-child-friendly font-data text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Task Notifications */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-surface rounded-child-friendly">
          <div className="flex items-center space-x-3">
            <span className="text-xl">✅</span>
            <div>
              <div className="font-body font-body-semibold text-text-primary">
                Task Completion Alerts
              </div>
              <div className="font-caption text-sm text-text-secondary">
                Celebrate when you complete daily tasks
              </div>
            </div>
          </div>
          <PandaToggle 
            isOn={taskNotifications} 
            onToggle={handleTaskNotificationsToggle}
            onEmoji="🎉"
            offEmoji="😐"
          />
        </div>
      </div>

      {/* Level Up Alerts */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-surface rounded-child-friendly">
          <div className="flex items-center space-x-3">
            <span className="text-xl">🏆</span>
            <div>
              <div className="font-body font-body-semibold text-text-primary">
                Level Up Celebrations
              </div>
              <div className="font-caption text-sm text-text-secondary">
                Get excited when your panda levels up
              </div>
            </div>
          </div>
          <PandaToggle 
            isOn={levelUpAlerts} 
            onToggle={handleLevelUpAlertsToggle}
            onEmoji="✨"
            offEmoji="😑"
          />
        </div>
      </div>

      {/* Notification Preview */}
      <div className="p-4 bg-gradient-to-r from-primary to-secondary bg-opacity-10 rounded-child-friendly border border-primary border-opacity-20">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🐼</div>
          <div>
            <div className="font-body font-body-semibold text-sm text-text-primary">
              Preview Notification
            </div>
            <div className="font-caption text-xs text-text-secondary mt-1">
              {dailyReminders 
                ? `"Time to practice Chinese! Your panda misses you! 🐼💕" - Daily at ${reminderTime}`
                : "Daily reminders are turned off"
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;