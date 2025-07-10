import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const ChatContainer = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 bg-transparent">
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6 animate-bounce">🐼</div>
            <h3 className="font-heading font-bold text-2xl text-gray-800 mb-4">
              和你的熊猫朋友开始聊天吧！
            </h3>
            <p className="font-body text-gray-600 mb-6 text-lg">
              试试说"你好"或问问中文文化的问题 ✨
            </p>
            <div className="bg-white rounded-3xl p-6 max-w-md mx-auto shadow-lg border border-pink-100">
              <p className="font-body text-gray-800 mb-4 font-semibold">
                🌟 常用短语：
              </p>
              <ul className="font-body text-gray-700 space-y-2 text-left">
                <li className="flex items-center space-x-2">
                  <span className="text-pink-500">•</span>
                  <span>你好 (nǐ hǎo) - Hello</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-pink-500">•</span>
                  <span>谢谢 (xiè xiè) - Thank you</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-pink-500">•</span>
                  <span>再见 (zài jiàn) - Goodbye</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-pink-500">•</span>
                  <span>完成了 - I completed it!</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.content}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}
          </div>
        )}
        
        {isLoading && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;