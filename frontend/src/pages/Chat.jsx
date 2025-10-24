import { useState, useEffect, useRef } from 'react';
import { conversationService, messageService } from '../api/services';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setError(null);
      const response = await conversationService.getAll();
      setConversations(response.data);
      if (response.data.length > 0 && !currentConversation) {
        selectConversation(response.data[0]);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to load conversations';
      console.error('Failed to load conversations:', error);
      setError(errorMsg);
    }
  };

  const selectConversation = async (conversation) => {
    setCurrentConversation(conversation);
    setLoading(true);
    setError(null);
    try {
      const response = await messageService.getAll(conversation.id);
      setMessages(response.data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to load messages';
      console.error('Failed to load messages:', error);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const createNewConversation = async () => {
    try {
      setError(null);
      const response = await conversationService.create('New Conversation', {});
      setConversations([response.data, ...conversations]);
      selectConversation(response.data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to create conversation';
      console.error('Failed to create conversation:', error);
      setError(errorMsg);
    }
  };

  const sendMessage = async (content) => {
    if (!currentConversation || !content.trim()) return;

    try {
      setError(null);
      // Add user message
      const userMessageResponse = await messageService.create(
        currentConversation.id,
        'user',
        content,
        null,
        'completed'
      );

      setMessages([...messages, userMessageResponse.data]);

      // Simulate AI response (in real app, this would call your AI backend)
      const assistantMessage = await messageService.create(
        currentConversation.id,
        'assistant',
        'I am an intelligent AI chatbot. I can help you with various tasks. How can I assist you today?',
        null,
        'completed'
      );

      setMessages((prev) => [...prev, assistantMessage.data]);

      // Update conversation title if it's still "New Conversation"
      if (currentConversation.title === 'New Conversation') {
        const updatedConversation = await conversationService.update(
          currentConversation.id,
          { title: content.substring(0, 50) }
        );
        setCurrentConversation(updatedConversation.data);
        setConversations(
          conversations.map((c) =>
            c.id === updatedConversation.data.id ? updatedConversation.data : c
          )
        );
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to send message';
      console.error('Failed to send message:', error);
      setError(errorMsg);
    }
  };

  const deleteConversation = async (id) => {
    try {
      setError(null);
      await conversationService.delete(id);
      const updated = conversations.filter((c) => c.id !== id);
      setConversations(updated);
      if (currentConversation?.id === id) {
        if (updated.length > 0) {
          selectConversation(updated[0]);
        } else {
          setCurrentConversation(null);
          setMessages([]);
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to delete conversation';
      console.error('Failed to delete conversation:', error);
      setError(errorMsg);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <Sidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onSelectConversation={selectConversation}
        onNewConversation={createNewConversation}
        onDeleteConversation={deleteConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <ChatWindow
        conversation={currentConversation}
        messages={messages}
        loading={loading}
        onSendMessage={sendMessage}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}

export default Chat;

