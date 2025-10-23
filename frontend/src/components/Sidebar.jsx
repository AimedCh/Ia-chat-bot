import { Link } from 'react-router-dom';

function Sidebar({
  conversations,
  currentConversation,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isOpen,
  onToggle,
}) {
  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative w-64 h-screen bg-gray-900 text-white transition-transform duration-300 z-40 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">IA Chatbot</h1>
          <p className="text-sm text-gray-400">Your AI Assistant</p>
        </div>

        {/* New Conversation Button */}
        <button
          onClick={onNewConversation}
          className="m-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          + New Chat
        </button>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 rounded-lg cursor-pointer transition duration-200 flex justify-between items-center group ${
                currentConversation?.id === conversation.id
                  ? 'bg-blue-600'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div
                onClick={() => onSelectConversation(conversation)}
                className="flex-1 truncate"
              >
                <p className="text-sm truncate">{conversation.title || 'Untitled'}</p>
                <p className="text-xs text-gray-400">
                  {new Date(conversation.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <Link
            to="/settings"
            className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            ⚙️ Settings
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        ></div>
      )}
    </>
  );
}

export default Sidebar;

