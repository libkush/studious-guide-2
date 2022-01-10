module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        textPrimary: "#b6b6b6",
        textSecondary: "#ececec",
        primary: "#FF5C00",
        secondary: "#FC955B",
      },
    },
  },
  plugins: [],
};
