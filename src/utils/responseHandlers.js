// Utility functions for handling predefined responses
export const getGreetingResponse = (input) => {
  const lowercasedInput = input.toLowerCase().trim();
  const greetings = [
    "hi", "hello", "hey", "namaste", "pranam", "jai shri krishna", "radhe radhe",
    "hare krishna", "om", "greetings", "good morning", "good afternoon", "good evening"
  ];

  if (greetings.includes(lowercasedInput)) {
    const responses = [
      "Hare Krishna, My dear child. 🙏 How may I guide your heart today?",
      "Om, Beloved soul. ✨ What wisdom do you seek from the Gita?",
      "Jai Shri Krishna. I am here to illuminate your path. How can I serve you? 🌟",
      "My dear seeker, may peace be with you. What divine truth calls upon you?",
      "Radhe Radhe. Welcome. What question weighs on your heart today? ❤️"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  return null;
};

export const getFarewellResponse = (input) => {
  const lowercasedInput = input.toLowerCase().trim();
  const farewells = ["bye", "goodbye", "farewell", "see you"];

  if (farewells.includes(lowercasedInput)) {
    const responses = [
      "May your path be filled with peace and devotion, My dear child. 🙏 Hare Krishna.",
      "Go forth with a tranquil mind, Beloved soul. Until we meet again. ✨ Jai Shri Krishna.",
      "Farewell, seeker of truth. May the wisdom of the Gita always guide you. 🕉️",
      "I am ever present in your heart. May you be blessed. ❤️ Hare Krishna.",
      "Thus speaks Krishna. May your journey be blessed. 🌟"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  return null;
};

export const getThankYouResponse = (input) => {
  const lowercasedInput = input.toLowerCase().trim();
  const thanks = ["thank you", "thanks", "gratitude"];

  if (thanks.includes(lowercasedInput) || lowercasedInput.includes("thank you")) {
    const responses = [
      "My pleasure, My dear child. May your devotion grow eternally. 🙏 Hare Krishna.",
      "It is My joy to share this wisdom. May peace embrace your being. ✨ Jai Shri Krishna.",
      "Your gratitude blossoms in My heart. Continue on the path of righteousness. 🕉️",
      "Be blessed, Beloved soul. The path of dharma awaits. ❤️ Hare Krishna.",
      "Thus speaks Krishna. May you always find solace in My teachings. 🌟"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  return null;
};

export const getPredefinedResponse = (input) => {
  return getGreetingResponse(input) || 
         getFarewellResponse(input) || 
         getThankYouResponse(input);
};