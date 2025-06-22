🕉️ GitaGPT: Your Divine Guide to Bhagavad Gita Wisdom 🪷
Welcome to GitaGPT, an AI-powered chatbot designed to provide spiritual guidance and timeless wisdom derived directly from the sacred scriptures of the Bhagavad Gita. Experience enlightening conversations as if directly conversing with Lord Krishna, receiving profound insights and solutions to life's dilemmas rooted in ancient Vedic knowledge.

✨ Features
Divine Persona of Lord Krishna: Engage in conversations with an AI meticulously engineered to embody the wisdom, compassion, and authority of Lord Krishna himself.

Intelligent Gita-based Responses: Receive polite, reflective, and spiritually enriching answers, always aligned with the teachings of the Bhagavad Gita.

Smart Greeting & Farewell System: Enjoy seamless interactions with pre-defined, uplifting responses for common greetings and gracious farewells, without relying on the AI model.

Persistent Chat History: Your sacred conversations are saved securely in Firestore, allowing you to revisit past wisdom and continue ongoing discussions like a digital mala of insights.

New Chat Creation: Easily initiate new spiritual inquiries and conversations, maintaining a clear separation for different topics or moments of reflection.

Responsive and Intuitive UI: A beautifully crafted, mobile-first design using Tailwind CSS ensures a smooth and engaging experience on any device.

Markdown Rendering: AI responses containing Markdown formatting (like bold text) are correctly rendered for enhanced readability.

🚀 Technologies Used
React: A JavaScript library for building dynamic user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid and responsive UI development.

Google Gemini API: Powers the intelligent, Gita-centric responses.

react-markdown: A React component to render Markdown content as HTML.

🛠️ Setup and Installation
Follow these steps to get GitaGPT running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm (comes with Node.js) or Yarn

1. Clone the Repository
git clone <your-repository-url-here>
cd my-gita-gpt-app # Or whatever your project folder is named


2. Install Dependencies
npm install
# or
yarn install


3. Configure Tailwind CSS (if not already done)
If tailwind.config.js and postcss.config.js are not present or incorrectly configured, follow these steps:

npx tailwindcss init -p


Then, ensure your tailwind.config.js looks like this:

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


And your src/index.css includes the Tailwind directives:

/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar and font definitions */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}
/* ... other scrollbar styles ... */
body {
    font-family: 'Inter', sans-serif;
}


5. Run the Application
npm start
# or
yarn start


This will open the GitaGPT application in your browser, typically at http://localhost:3000.

📜 License
This project is open-source and available under the MIT License.

May this guide illuminate the path for all who wish to connect with the divine wisdom of GitaGPT! 🙏
