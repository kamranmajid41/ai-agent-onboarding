import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSend, AiOutlineUser, AiOutlineRobot } from 'react-icons/ai';
import { Button } from '../ui';

const ChatInterface = ({ 
  agentName = 'AI Assistant',
  welcomeMessage = 'Hello! How can I help you today?',
  onSendMessage,
  disabled = false,
  className = '',
  ...props 
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      content: welcomeMessage,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || disabled) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'agent',
        content: `Thank you for your message: "${userMessage.content}". This is a simulated response from ${agentName}. In a real implementation, this would be processed by the AI model.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex flex-col h-96 bg-surface-800/50 rounded-lg border border-surface-600/50 ${className}`} {...props}>
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-surface-600/50">
        <div className="w-8 h-8 bg-primary-900/50 rounded-full flex items-center justify-center">
          <AiOutlineRobot className="w-4 h-4 text-primary-300" />
        </div>
        <div>
          <span className="font-medium text-white">{agentName}</span>
          <div className="text-xs text-green-400">Online</div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'agent' && (
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <AiOutlineRobot className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary-600 text-white rounded-br-none mr-3'
                  : 'bg-surface-700 text-white border border-surface-600 rounded-bl-none'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className="text-xs opacity-70 mt-1">
                {formatTime(message.timestamp)}
              </div>
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <AiOutlineUser className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
              <AiOutlineRobot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white text-gray-900 border border-gray-200 rounded-lg rounded-bl-none px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-surface-600/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            className="flex-1 bg-surface-800 text-white border border-surface-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || disabled || isTyping}
            className="px-4"
          >
            <AiOutlineSend className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 