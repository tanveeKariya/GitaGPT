// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS, JSX, TS, TSX files in src folder
    "./public/index.html",      // Scan index.html for classes used directly there
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here, e.g.,
      colors: {
        'custom-blue': '#243c5a',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], // Example: set Inter as default sans-serif font
      }
    },
  },
  plugins: [],
}