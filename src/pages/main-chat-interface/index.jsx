import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import IdiomsQuestionBar from '../../components/ui/IdiomsQuestionBar';
import PandaAvatar from './components/PandaAvatar';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import LevelProgressHeader from './components/LevelProgressHeader';
import openaiService from '../../services/openaiService';
import themeManager from '../../utils/themeManager';

const MainChatInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [petLevel, setPetLevel] = useState(1);
  const [petMood, setPetMood] = useState('happy');
  const [currentUser, setCurrentUser] = useState(null);
  const [themeConfig, setThemeConfig] = useState(themeManager.getThemeConfig());

  const moods = ['shy', 'proud', 'surprised', 'happy'];

  useEffect(() => {
    initializeUser();
    
    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeConfig(event.detail.config);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, [navigate]);

  // Handle auto-message from story detail screen
  useEffect(() => {
    if (location.state?.autoMessage) {
      handleSendMessage(location.state.autoMessage);
      // Clear the state to prevent re-sending on re-render
      navigate('/main-chat-interface', { replace: true });
    }
  }, [location.state]);

  const initializeUser = async () => {
    // Check authentication
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login-screen');
      return;
    }
    
    const user = JSON.parse(userData);
    setCurrentUser(user);

    // Load user-specific data
    const userKey = user.email;
    await loadUserData(userKey);
  };

  const loadUserData = async (userKey) => {
    const savedLevel = localStorage.getItem(`pandaPetLevel_${userKey}`);
    const savedMood = localStorage.getItem(`pandaPetMood_${userKey}`);
    const savedMessages = localStorage.getItem(`chatMessages_${userKey}`);

    if (savedLevel) {
      setPetLevel(parseInt(savedLevel, 10));
    } else {
      setPetLevel(1);
      localStorage.setItem(`pandaPetLevel_${userKey}`, '1');
    }
    
    if (savedMood) {
      setPetMood(savedMood);
    } else {
      setPetMood('happy');
      localStorage.setItem(`pandaPetMood_${userKey}`, 'happy');
    }
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMessage = {
        id: 1,
        content: "你好！欢迎来到Zeal Panda！🐼✨ 嘻嘻，我是你的熊猫朋友，我们一起学习中文吧！就像小时候第一次见到新朋友一样激动呢～ 嘿嘿，点击下面的成语问题来开始探索吧！我会给你讲很多有趣的故事哦～",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      localStorage.setItem(`chatMessages_${userKey}`, JSON.stringify([welcomeMessage]));
    }
  };

  const handleSendMessage = async (messageContent) => {
    if (!currentUser) return;

    const userKey = currentUser.email;
    const userMessage = {
      id: Date.now(),
      content: messageContent,
      isUser: true,
      timestamp: new Date()
    };

    // Add user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Increase pet level
    const newLevel = petLevel + 1;
    setPetLevel(newLevel);
    localStorage.setItem(`pandaPetLevel_${userKey}`, newLevel.toString());

    // Random mood selection based on requirements
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    setPetMood(randomMood);
    localStorage.setItem(`pandaPetMood_${userKey}`, randomMood);

    // Show loading indicator
    setIsLoading(true);

    try {
      // Get enhanced AI response using OpenAI service
      const aiResponse = await openaiService.generateResponse(messageContent, randomMood);
      
      const aiMessage = {
        id: Date.now() + 1,
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      
      // Save messages to localStorage
      localStorage.setItem(`chatMessages_${userKey}`, JSON.stringify(finalMessages));
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Enhanced fallback message with story
      const errorMessage = {
        id: Date.now() + 1,
        content: "哎呀，我的小脑袋突然转不过来了！🐼😵 嘻嘻，就像昨天我想同时抓两根竹子结果都掉了一样！让我休息一下再来陪你聊天好吗？嘿嘿，我刚才在想今天见到的彩色蝴蝶，太美了～ 嘿嘻，你再说一遍，我会认真听的！",
        isUser: false,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      localStorage.setItem(`chatMessages_${userKey}`, JSON.stringify(finalMessages));
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdiomQuestionClick = (question) => {
    // Auto-send the idiom question to chat
    handleSendMessage(question);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeConfig.background }}>
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🐼</div>
          <p className="text-lg" style={{ color: themeConfig.textSecondary }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: themeConfig.background }}>
      <AppHeader />
      
      <LevelProgressHeader level={petLevel} mood={petMood} />
      
      <IdiomsQuestionBar onQuestionClick={handleIdiomQuestionClick} />
      
      <PandaAvatar 
        mood={petMood} 
        level={petLevel} 
        isTyping={isLoading}
      />
      
      <ChatContainer 
        messages={messages} 
        isLoading={isLoading}
      />
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
      
      {/* Footer with branding */}
      <footer className="py-2 px-4 text-center border-t" style={{ backgroundColor: themeConfig.surface, borderColor: themeConfig.border }}>
        <p className="text-xs" style={{ color: themeConfig.textSecondary }}>
          Powered by Zeal Education
        </p>
      </footer>
    </div>
  );
};

export default MainChatInterface;