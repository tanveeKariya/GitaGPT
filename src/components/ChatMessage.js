import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`mb-6 ${isUser ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block max-w-[85%] p-4 rounded-2xl shadow-md ${
          isUser
            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
            : 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-900 border border-orange-200'
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">🌟</span>
            <span className="font-semibold text-orange-700">
              Lord Krishna
            </span>
          </div>
        )}
        <div className="whitespace-pre-wrap leading-relaxed text-base">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;