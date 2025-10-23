import { useState } from 'react';

function MessageInput({ value, onChange, onSend, disabled }) {
  const [rows, setRows] = useState(1);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    setRows(Math.min(Math.max(textarea.scrollHeight / 24, 1), 5));
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex gap-2">
        <textarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for new line)"
          rows={rows}
          disabled={disabled}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-100"
        />
        <button
          onClick={() => onSend(value)}
          disabled={disabled || !value.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageInput;

