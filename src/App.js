import React, { useState, useEffect, useRef } from "react";
import ChatMessage from './components/ChatMessage';
import LoadingIndicator from './components/LoadingIndicator';
import WelcomeScreen from './components/WelcomeScreen';
import ErrorMessage from './components/ErrorMessage';
import geminiService from './services/geminiService';
import { getPredefinedResponse } from './utils/responseHandlers';

function App() {
  // State management
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessageContent = input.trim();
    const newUserMessage = { 
      id: Date.now(), 
      role: "user", 
      content: userMessageContent 
    };

    // Add user message and clear input
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput("");
    setStatus("submitted");
    setError(null);

    try {
      // Check for predefined responses first
      const predefinedResponse = getPredefinedResponse(userMessageContent);
      
      if (predefinedResponse) {
        const aiMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: predefinedResponse,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setStatus("idle");
        return;
      }

      // Generate AI response using Gemini service
      const aiResponseContent = await geminiService.generateResponse(messages, userMessageContent);
      
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiResponseContent,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setStatus("idle");

    } catch (err) {
      console.error("Error fetching AI response:", err);
      setError(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-br from-orange-50 to-amber-100 text-orange-900 font-inter">
      {/* Header */}
      <div className="flex items-center justify-center space-x-3 mb-8">
        <div className="text-5xl md:text-6xl">🕉️</div>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-orange-900">
            GitaGPT
          </h1>
          <p className="text-orange-700 text-lg md:text-xl mt-1">
            Wisdom from the Bhagavad Gita
          </p>
        </div>
        <div className="text-5xl md:text-6xl">🪷</div>
      </div>

      {/* Main Chat Container */}
      <div className="w-full max-w-4xl">
        <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
          {/* Header Quote */}
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-t-xl p-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🕉️</div>
              <p className="text-orange-800 font-semibold text-lg md:text-xl leading-relaxed">
                "You have the right to perform your actions, but you are not
                entitled to the fruits of action."
              </p>
              <p className="text-orange-600 text-sm md:text-base mt-2">
                - Bhagavad Gita 2.47
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="p-0">
            <div className="h-[60vh] max-h-[70vh] p-6 overflow-y-auto custom-scrollbar">
              {messages.length === 0 && <WelcomeScreen />}

              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {error && <ErrorMessage error={error} />}

              {(status === "submitted" || status === "streaming") && <LoadingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <div className="p-6 border-t border-orange-100 bg-white/60 rounded-b-xl backdrop-blur-md">
            <form className="flex items-center space-x-3 w-full" onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Seek divine guidance from the Bhagavad Gita..."
                className="flex-grow p-3 text-base border border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white shadow-sm rounded-lg transition-all duration-200 outline-none"
                disabled={status === "submitted" || status === "streaming"}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={
                  status === "submitted" || status === "streaming" || !input.trim()
                }
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
                  className="w-5 h-5"
                >
                  <path d="M22 2L11 13M22 2l-7 19-3-7-7-3 19-7z" />
                </svg>
                <span className="hidden sm:inline">Seek</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm mt-6 text-center text-orange-800">
          "The soul is neither born, and nor does it die" - Bhagavad Gita 2.20
        </p>
        <div className="flex justify-center items-center space-x-2 mt-3">
          <span className="text-xl">🌟</span>
          <span className="text-sm text-orange-700">Guided by My eternal wisdom 🙏</span>
          <span className="text-xl">🪷</span>
        </div>
      </div>
    </div>
  );
}

export default App;