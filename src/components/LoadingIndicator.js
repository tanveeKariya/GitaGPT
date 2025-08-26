import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="text-left mb-6">
      <div className="inline-block bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🌟</span>
          <span className="font-semibold text-orange-700">
            Lord Krishna
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-orange-500 animate-pulse"
          >
            <path d="M12 3v18M3 12h18M18 18l-6-6M6 6l6 6" />
          </svg>
          <span className="text-orange-600 text-base">
            Meditating upon your query, My dear child... 🙏
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;