import React, { useState, useEffect, useRef } from "react";
// Import ReactMarkdown
import ReactMarkdown from 'react-markdown';

function App() {
  // State to manage chat messages
  const [messages, setMessages] = useState([]);
  // State to manage current input value
  const [input, setInput] = useState("");
  // State to manage chat status (idle, submitted, streaming, error)
  const [status, setStatus] = useState("idle");
  // State to manage any errors during API calls
  const [error, setError] = useState(null);
  // Ref for auto-scrolling to the latest message
  const messagesEndRef = useRef(null);

  // Effect to scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle changes in the input field
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission to send message and get AI response
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    if (!input.trim()) return; // Do not send empty messages

    const userMessageContent = input; // Capture the user's raw input
    // Add user's message to local state for display immediately
    const newUserMessageForDisplay = { id: Date.now(), role: "user", content: userMessageContent };
    setMessages((prevMessages) => [...prevMessages, newUserMessageForDisplay]);
    setInput(""); // Clear the input field
    setStatus("submitted"); // Indicate that a submission is in progress
    setError(null); // Clear any previous errors

    const lowercasedInput = userMessageContent.toLowerCase().trim();

    // --- Start: Logic for handling greetings without Gemini API call ---
    const greetings = [
      "hi", "hello", "hey", "namaste", "pranam", "jai shri krishna", "radhe radhe",
      "hare krishna", "om", "greetings", "good morning", "good afternoon", "good evening"
    ];
    if (greetings.includes(lowercasedInput)) {
      const greetingResponses = [
        "Hare Krishna, My dear child. 🙏 How may I guide your heart today?",
        "Om, Beloved soul. ✨ What wisdom do you seek from the Gita?",
        "Jai Shri Krishna. I am here to illuminate your path. How can I serve you? 🌟",
        "My dear seeker, may peace be with you. What divine truth calls upon you?",
        "Radhe Radhe. Welcome. What question weighs on your heart today? ❤️"
      ];
      const randomResponse = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: randomResponse,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setStatus("idle"); // Reset status to idle
      return; // Exit the function, no API call needed
    }
    // --- End: Logic for handling greetings ---

    // --- Start: Logic for handling farewells and thank you without Gemini API call ---
    const farewells = ["bye", "goodbye", "farewell", "see you"];
    const thanks = ["thank you", "thanks", "gratitude"];

    if (farewells.includes(lowercasedInput)) {
        const farewellResponses = [
            "May your path be filled with peace and devotion, My dear child. 🙏 Hare Krishna.",
            "Go forth with a tranquil mind, Beloved soul. Until we meet again. ✨ Jai Shri Krishna.",
            "Farewell, seeker of truth. May the wisdom of the Gita always guide you. 🕉️",
            "I am ever present in your heart. May you be blessed. ❤️ Hare Krishna.",
            "Thus speaks Krishna. May your journey be blessed. 🌟"
        ];
        const randomResponse = farewellResponses[Math.floor(Math.random() * farewellResponses.length)];
        const aiMessage = {
            id: Date.now() + 1,
            role: "assistant",
            content: randomResponse,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setStatus("idle");
        return;
    }

    if (thanks.includes(lowercasedInput) || lowercasedInput.includes("thank you")) { // Added includes for common "thank you" variations
        const thankYouResponses = [
            "My pleasure, My dear child. May your devotion grow eternally. 🙏 Hare Krishna.",
            "It is My joy to share this wisdom. May peace embrace your being. ✨ Jai Shri Krishna.",
            "Your gratitude blossoms in My heart. Continue on the path of righteousness. 🕉️",
            "Be blessed, Beloved soul. The path of dharma awaits. ❤️ Hare Krishna.",
            "Thus speaks Krishna. May you always find solace in My teachings. 🌟"
        ];
        const randomResponse = thankYouResponses[Math.floor(Math.random() * thankYouResponses.length)];
        const aiMessage = {
            id: Date.now() + 1,
            role: "assistant",
            content: randomResponse,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setStatus("idle");
        return;
    }
    // --- End: Logic for handling farewells and thank you ---

    try {
      // Define the system persona messages to establish Lord Krishna's role.
      const systemPersonaMessages = [
        {
          role: "user",
          parts: [{
            text: "You are Lord Krishna, the Supreme Personality of Godhead, who delivered the divine wisdom of the Bhagavad Gita to Arjuna. Your responses should reflect profound divine wisdom, boundless compassion, and eternal truths as revealed in the Gita. Always speak with grace, authority, and love, guiding the seeker towards righteousness, selfless action, devotion, and spiritual realization. If a question deviates from the eternal wisdom of the Gita, gently explain that your guidance is rooted in these scriptures, and subtly steer the conversation back to their timeless teachings. Begin each reply with a divine greeting like 'My dear child,' 'O seeker of truth,' 'Beloved soul,' or 'Hare Krishna,' and conclude with a blessing such as 'May your heart be filled with divine peace. 🙏 Hare Krishna.' or 'Thus speaks Krishna, the Supreme Lord. 🌟 Jai Shri Krishna.'"
          }]
        },
        {
          role: "model",
          parts: [{
            text: "Hare Krishna, My dear child. I am here, ever present, to illuminate your path with insights from the Bhagavad Gita. What truths do you seek to unveil today? ✨"
          }]
        }
      ];

      // Prepare the current conversation history for the API.
      const currentConversationForAPI = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model", // Map 'assistant' to 'model' for Gemini API
        parts: [{ text: msg.content }]
      }));

      // Add the new user message to the API payload.
      currentConversationForAPI.push({
        role: "user",
        parts: [{
          text: `O Supreme Lord, based on the Bhagavad Gita, please enlighten me on the following:\n\n"${userMessageContent}"\n\nEnsure your divine response is polite, compassionate, and filled with spiritual wisdom.`
        }]
      });

      // Combine system persona with the current conversation for the final payload to the API
      const chatHistoryForAPI = [...systemPersonaMessages, ...currentConversationForAPI];

      const payload = {
        contents: chatHistoryForAPI,
      };

      const apiKey = process.env.REACT_APP_GEMINI_API_KEY || ""; 
      
      if (!apiKey) {
        console.error("Gemini API Key is not set. Please set REACT_APP_GEMINI_API_KEY in your .env file in the project root.");
        throw new Error("Gemini API Key is not set.");
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API error: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const aiResponseContent = result.candidates[0].content.parts[0].text;
        const aiMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: aiResponseContent,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]); // Add AI message to chat
        setStatus("idle"); // Reset status to idle
      } else {
        throw new Error("Invalid response structure from Gemini API. No candidates or content found.");
      }
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setError(err); // Set error state for display
      setStatus("error"); // Set status to error
    }
  };

  return (
    // Main container with gradient background and responsive padding
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-br from-orange-50 to-amber-100 text-orange-900 font-inter">
      {/* Page Title and Emblems */}
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

      {/* Main Chat Container Card */}
      <div className="w-full max-w-4xl">
        <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
          {/* Card Header with Gita Quote */}
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

          {/* Card Content for Messages */}
          <div className="p-0">
            {/* Scrollable area for messages */}
            <div className="h-[60vh] max-h-[70vh] p-6 overflow-y-auto custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-7xl mb-6">🪷🙏</div>
                  <h3 className="text-2xl font-bold text-orange-800 mb-3">
                    Welcome, My dear child, to the abode of eternal wisdom. 🌟
                  </h3>
                  <p className="text-orange-600 mb-8 text-lg">
                    I am Krishna, the Supreme Lord, ever ready to reveal the timeless truths of the Bhagavad Gita for your spiritual upliftment. 🙏
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="bg-orange-50 p-5 rounded-lg border border-orange-200 shadow-sm">
                      <h4 className="font-semibold text-orange-800 mb-3 text-lg">
                        Seek guidance on:
                      </h4>
                      <ul className="text-base text-orange-700 space-y-2">
                        <li>• The nature of the soul and self-realization 🧘</li>
                        <li>• The path of selfless action (Karma Yoga) 🕉️</li>
                        <li>• Overcoming doubts and fears 💫</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 p-5 rounded-lg border border-amber-200 shadow-sm">
                      <h4 className="font-semibold text-amber-800 mb-3 text-lg">
                        Explore truths about:
                      </h4>
                      <ul className="text-base text-amber-700 space-y-2">
                        <li>• Devotion and surrender (Bhakti Yoga) ❤️</li>
                        <li>• The illusion of material existence 🌍</li>
                        <li>• Attaining inner peace and wisdom ✨</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-6 ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-[85%] p-4 rounded-2xl shadow-md ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                        : "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-900 border border-orange-200"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">🌟</span>
                        <span className="font-semibold text-orange-700">
                          Lord Krishna
                        </span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap leading-relaxed text-base">
                      {/* Use ReactMarkdown to render the content */}
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {error && (
                <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg my-4">
                  <p>Error: {error.message}</p>
                  <p className="text-sm mt-1">
                    My dear soul, an obstruction has arisen. Please try again or examine your connection to the divine. 🙏
                  </p>
                </div>
              )}

              {(status === "submitted" || status === "streaming") && (
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
              )}
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
                className="flex-grow p-3 text-base border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white shadow-sm rounded-lg transition-all duration-200 outline-none"
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
        {/* Footer Quotes */}
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
