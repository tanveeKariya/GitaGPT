# 🕉️ GitaGPT: Your Divine Guide to Bhagavad Gita Wisdom 🪷

Welcome to GitaGPT, an AI-powered chatbot designed to provide spiritual guidance and timeless wisdom derived directly from the sacred scriptures of the Bhagavad Gita. Experience enlightening conversations as if directly conversing with Lord Krishna, receiving profound insights and solutions to life's dilemmas rooted in ancient Vedic knowledge.

## ✨ Features

- **Divine Persona of Lord Krishna**: Engage in conversations with an AI meticulously engineered to embody the wisdom, compassion, and authority of Lord Krishna himself.
- **Intelligent Gita-based Responses**: Receive polite, reflective, and spiritually enriching answers, always aligned with the teachings of the Bhagavad Gita.
- **Smart Greeting & Farewell System**: Enjoy seamless interactions with pre-defined, uplifting responses for common greetings and gracious farewells.
- **Responsive and Intuitive UI**: A beautifully crafted, mobile-first design using Tailwind CSS ensures a smooth and engaging experience on any device.
- **Markdown Rendering**: AI responses containing Markdown formatting are correctly rendered for enhanced readability.
- **Error Handling**: Comprehensive error handling with user-friendly messages.

## 🚀 Technologies Used

- **React**: A JavaScript library for building dynamic user interfaces
- **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development
- **Google Gemini API**: Powers the intelligent, Gita-centric responses
- **react-markdown**: A React component to render Markdown content as HTML

## 🛠️ Setup and Installation

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js) or Yarn
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone <your-repository-url-here>
cd gita-gpt-react-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the `.env` file and update it with your actual Gemini API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

2. To get a Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key and paste it in your `.env` file

### 4. Run the Application

```bash
npm start
```

This will open the GitaGPT application in your browser at `http://localhost:3000`.

### 5. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatMessage.js      # Individual chat message component
│   ├── ErrorMessage.js     # Error display component
│   ├── LoadingIndicator.js # Loading state component
│   └── WelcomeScreen.js    # Welcome screen component
├── services/
│   └── geminiService.js    # Gemini API service
├── utils/
│   └── responseHandlers.js # Predefined response handlers
├── App.js                  # Main application component
├── App.test.js            # Application tests
├── index.js               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

### PostCSS

PostCSS configuration is in `postcss.config.js` for processing Tailwind CSS.

## 🚨 Troubleshooting

### Common Issues

1. **API Key Error**: Ensure your Gemini API key is correctly set in the `.env` file
2. **Styling Issues**: Make sure Tailwind CSS is properly configured and imported
3. **Build Errors**: Check that all dependencies are installed correctly

### Error Messages

The application provides user-friendly error messages for common issues:
- Missing or invalid API key
- Network connectivity problems
- API rate limiting

## 📜 License

This project is open-source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by the timeless wisdom of the Bhagavad Gita
- Powered by Google's Gemini AI
- Built with love and devotion

---

May this guide illuminate the path for all who wish to connect with the divine wisdom of GitaGPT! 🙏

*"You have the right to perform your actions, but you are not entitled to the fruits of action."* - Bhagavad Gita 2.47
</btml:Action>