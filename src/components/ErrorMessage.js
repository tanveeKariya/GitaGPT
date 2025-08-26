import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg my-4 border border-red-200">
      <div className="flex items-center justify-center mb-2">
        <span className="text-2xl mr-2">⚠️</span>
        <span className="font-semibold">Divine Guidance Interrupted</span>
      </div>
      <p className="text-sm">
        <strong>Error:</strong> {error.message}
      </p>
      <p className="text-sm mt-2 text-red-500">
        My dear soul, an obstruction has arisen. Please check your connection and try again. 🙏
      </p>
      {error.message.includes('API Key') && (
        <div className="mt-3 p-3 bg-red-100 rounded border border-red-300">
          <p className="text-sm font-medium">
            Please ensure your Gemini API key is properly set in the .env file
          </p>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;