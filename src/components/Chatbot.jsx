import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { 
      id: prev.length + 1, 
      text: message, 
      sender: 'user' 
    }]);

    // Simulate bot response (replace with actual AI logic)
    const botResponse = {
      id: messages.length + 2, 
      text: 'I understand. Let me help you with that.', 
      sender: 'bot'
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Bubble */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 transition-all transform hover:scale-110 animate-bounce-subtle"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="w-80 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h2 className="font-bold">Customer Support</h2>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-indigo-500 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-2 max-h-80">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    px-3 py-2 rounded-lg max-w-[70%] 
                    ${msg.sender === 'user' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-200 text-black'}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 flex items-center space-x-2">
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;