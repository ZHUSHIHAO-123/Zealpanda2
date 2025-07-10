import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSection = () => {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    setPasswordError('');
  };

  const handlePasswordSubmit = () => {
    // Mock password validation
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordData.current !== 'panda123') {
      setPasswordError('Current password is incorrect');
      return;
    }

    if (passwordData.new.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      setPasswordError('New passwords do not match');
      return;
    }

    // Mock successful password change
    setPasswordSuccess(true);
    setPasswordData({ current: '', new: '', confirm: '' });
    setTimeout(() => {
      setPasswordSuccess(false);
      setShowPasswordChange(false);
    }, 2000);
  };

  const handleLogout = () => {
    // Clear all user data from localStorage
    const keysToKeep = ['responseComplexity', 'taskDifficulty', 'showPinyin', 'voiceSpeed', 'dailyReminders', 'taskNotifications', 'levelUpAlerts', 'reminderTime'];
    const allKeys = Object.keys(localStorage);
    
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    // Redirect to login
    window.location.href = '/login-screen';
  };

  return (
    <div className="bg-background rounded-child-friendly-lg p-6 shadow-warm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-error to-warning rounded-child-friendly flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-white" />
        </div>
        <h2 className="font-heading font-heading-bold text-lg text-text-primary">
          Account
        </h2>
      </div>

      {/* Password Change Section */}
      <div className="mb-6">
        {!showPasswordChange ? (
          <button
            onClick={() => setShowPasswordChange(true)}
            className="w-full p-4 bg-surface rounded-child-friendly hover:bg-border transition-gentle text-left"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Lock" size={20} className="text-text-secondary" />
              <div>
                <div className="font-body font-body-semibold text-text-primary">
                  Change Password
                </div>
                <div className="font-caption text-sm text-text-secondary">
                  Update your account password
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary ml-auto" />
            </div>
          </button>
        ) : (
          <div className="p-4 bg-surface rounded-child-friendly">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-body font-body-semibold text-text-primary">
                Change Password
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswordError('');
                  setPasswordData({ current: '', new: '', confirm: '' });
                }}
                iconName="X"
                iconSize={16}
              />
            </div>

            {passwordSuccess && (
              <div className="mb-4 p-3 bg-success bg-opacity-10 border border-success border-opacity-30 rounded-child-friendly">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="font-body text-sm text-success">
                    Password changed successfully! 🎉
                  </span>
                </div>
              </div>
            )}

            {passwordError && (
              <div className="mb-4 p-3 bg-error bg-opacity-10 border border-error border-opacity-30 rounded-child-friendly">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error" />
                  <span className="font-body text-sm text-error">
                    {passwordError}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block font-body font-body-medium text-sm text-text-primary mb-2">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => handlePasswordChange('current', e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block font-body font-body-medium text-sm text-text-primary mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => handlePasswordChange('new', e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block font-body font-body-medium text-sm text-text-primary mb-2">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  onClick={handlePasswordSubmit}
                  iconName="Check"
                  iconSize={16}
                >
                  Update Password
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowPasswordChange(false);
                    setPasswordError('');
                    setPasswordData({ current: '', new: '', confirm: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-warning bg-opacity-10 rounded-child-friendly">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-warning mt-0.5" />
                <div>
                  <p className="font-caption text-sm text-warning font-medium">
                    Mock Credentials for Testing:
                  </p>
                  <p className="font-data text-xs text-text-secondary mt-1">
                    Current Password: panda123
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Section */}
      <div>
        {!showLogoutConfirm ? (
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full p-4 bg-error bg-opacity-10 border border-error border-opacity-30 rounded-child-friendly hover:bg-error hover:bg-opacity-20 transition-gentle text-left"
          >
            <div className="flex items-center space-x-3">
              <Icon name="LogOut" size={20} className="text-error" />
              <div>
                <div className="font-body font-body-semibold text-error">
                  Sign Out
                </div>
                <div className="font-caption text-sm text-text-secondary">
                  Sign out of your account
                </div>
              </div>
            </div>
          </button>
        ) : (
          <div className="p-4 bg-error bg-opacity-10 border border-error border-opacity-30 rounded-child-friendly">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">🐼😢</div>
              <div>
                <h3 className="font-body font-body-semibold text-text-primary">
                  Are you sure you want to sign out?
                </h3>
                <p className="font-caption text-sm text-text-secondary">
                  Your panda will miss you! Your progress will be saved.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="danger"
                onClick={handleLogout}
                iconName="LogOut"
                iconSize={16}
              >
                Yes, Sign Out
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowLogoutConfirm(false)}
                iconName="Heart"
                iconSize={16}
              >
                Stay with Panda
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSection;