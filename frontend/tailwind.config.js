/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Isto é essencial!
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
