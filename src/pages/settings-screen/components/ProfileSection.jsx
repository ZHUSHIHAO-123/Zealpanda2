import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = () => {
  const [displayName, setDisplayName] = useState('');
  const [petLevel, setPetLevel] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      const userKey = user.email;
      
      // Load user-specific data
      const savedName = localStorage.getItem(`userDisplayName_${userKey}`) || user.name || 'Young Learner';
      const savedLevel = localStorage.getItem(`pandaPetLevel_${userKey}`) || '1';
      
      setDisplayName(savedName);
      setPetLevel(parseInt(savedLevel, 10));
      setTempName(savedName);
    }
  };

  const handleSaveName = () => {
    if (tempName.trim() && currentUser) {
      const userKey = currentUser.email;
      setDisplayName(tempName.trim());
      localStorage.setItem(`userDisplayName_${userKey}`, tempName.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setTempName(displayName);
    setIsEditing(false);
  };

  const getAchievementBadge = () => {
    if (petLevel >= 50) return { icon: 'Crown', color: 'text-yellow-600', label: 'Master', bgColor: 'bg-yellow-100' };
    if (petLevel >= 25) return { icon: 'Star', color: 'text-orange-600', label: 'Expert', bgColor: 'bg-orange-100' };
    if (petLevel >= 10) return { icon: 'Award', color: 'text-green-600', label: 'Advanced', bgColor: 'bg-green-100' };
    return { icon: 'Heart', color: 'text-pink-600', label: 'Beginner', bgColor: 'bg-pink-100' };
  };

  const badge = getAchievementBadge();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="User" size={20} className="text-white" />
        </div>
        <h2 className="font-bold text-xl text-gray-800">
          个人资料
        </h2>
      </div>

      {/* Display Name Section */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-2">
          显示名称
        </label>
        {isEditing ? (
          <div className="space-y-3">
            <Input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="输入你的显示名称"
              className="w-full border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-pink-50"
            />
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveName}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl"
              >
                <Icon name="Check" size={16} className="mr-1" />
                保存
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                className="text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                <Icon name="X" size={16} className="mr-1" />
                取消
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="font-medium text-gray-800">{displayName}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-pink-600 hover:bg-pink-50 rounded-xl"
            >
              <Icon name="Edit2" size={16} className="mr-1" />
              编辑
            </Button>
          </div>
        )}
      </div>

      {/* Pet Level Section */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-2">
          熊猫等级与成就
        </label>
        <div className="p-4 bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl border border-pink-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🐼</div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xl text-gray-800">
                    等级 {petLevel}
                  </span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${badge.bgColor}`}>
                    <Icon name={badge.icon} size={12} className={badge.color} />
                    <span className="text-xs font-semibold text-gray-800">
                      {badge.label}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  继续聊天来提升熊猫等级！
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="w-16 h-2 bg-white rounded-full overflow-hidden mb-1">
                <div 
                  className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-500"
                  style={{ width: `${(petLevel % 10) * 10 + 10}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">
                {(petLevel % 10) + 1}/10
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl text-center border border-blue-200">
          <div className="text-3xl mb-2">💬</div>
          <div className="font-bold text-xl text-gray-800">
            {petLevel * 3}
          </div>
          <div className="text-sm text-gray-600">
            发送消息
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl text-center border border-yellow-200">
          <div className="text-3xl mb-2">🏆</div>
          <div className="font-bold text-xl text-gray-800">
            {Math.floor(petLevel / 5)}
          </div>
          <div className="text-sm text-gray-600">
            完成任务
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;