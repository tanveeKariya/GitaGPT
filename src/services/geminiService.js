// Service for handling Gemini API interactions
class GeminiService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }

  validateApiKey() {
    if (!this.apiKey || this.apiKey === 'your_actual_gemini_api_key_here') {
      throw new Error('Gemini API Key is not properly configured. Please set REACT_APP_GEMINI_API_KEY in your .env file.');
    }
  }

  getSystemPersonaMessages() {
    return [
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
  }

  prepareConversationForAPI(messages, userInput) {
    // Convert chat history to API format
    const conversationHistory = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Add the new user message
    conversationHistory.push({
      role: "user",
      parts: [{
        text: `O Supreme Lord, based on the Bhagavad Gita, please enlighten me on the following:\n\n"${userInput}"\n\nEnsure your divine response is polite, compassionate, and filled with spiritual wisdom.`
      }]
    });

    // Combine system persona with conversation
    return [...this.getSystemPersonaMessages(), ...conversationHistory];
  }

  async generateResponse(messages, userInput) {
    this.validateApiKey();

    const payload = {
      contents: this.prepareConversationForAPI(messages, userInput),
    };

    const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
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
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response structure from Gemini API. No candidates or content found.");
    }
  }
}

export default new GeminiService();