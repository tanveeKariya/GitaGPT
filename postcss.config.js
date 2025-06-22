// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // Correct way to use Tailwind CSS with PostCSS
    autoprefixer: {},
  },
};