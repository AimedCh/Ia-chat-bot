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

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await conversationService.getAll();
      setConversations(response.data);
      if (response.data.length > 0 && !currentConversation) {
        selectConversation(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const selectConversation = async (conversation) => {
    setCurrentConversation(conversation);
    setLoading(true);
    try {
      const response = await messageService.getAll(conversation.id);
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewConversation = async () => {
    try {
      const response = await conversationService.create('New Conversation', {});
      setConversations([response.data, ...conversations]);
      selectConversation(response.data);
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const sendMessage = async (content) => {
    if (!currentConversation || !content.trim()) return;

    try {
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
      console.error('Failed to send message:', error);
    }
  };

  const deleteConversation = async (id) => {
    try {
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
      console.error('Failed to delete conversation:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
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

