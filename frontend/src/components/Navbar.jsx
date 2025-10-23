import { Link } from 'react-router-dom';

function Navbar() {
  // Public app: no auth state or logout

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/chat" className="text-2xl font-bold text-blue-600">
            IA Chatbot
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/chat"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Chat
          </Link>
          <Link
            to="/settings"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


