import { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function ChatWindow({ conversation, messages, loading, onSendMessage, sidebarOpen }) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message) => {
    if (message.trim()) {
      onSendMessage(message);
      setInputValue('');
    }
  };

  if (!conversation) {
    return (
      <div className={`flex-1 flex items-center justify-center bg-gray-50 ${sidebarOpen ? '' : 'ml-0'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to IA Chatbot</h2>
          <p className="text-gray-600">Start a new conversation to begin chatting with your AI assistant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">{conversation.title || 'Untitled Conversation'}</h2>
        <p className="text-sm text-gray-600">
          {new Date(conversation.created_at).toLocaleString()}
        </p>
      </div>

      {/* Messages */}
      <MessageList messages={messages} loading={loading} />
      <div ref={messagesEndRef} />

      {/* Input */}
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        disabled={loading}
      />
    </div>
  );
}

export default ChatWindow;

