/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fff",
        text: "#020a00",
        border: "#efefef",
        secondary: "#f2f0f0",
        simmer: {
          100: "#f0f0f0",
          200: "#e0e0e0",
        },
        primary: "#a83ef5",
        warning: "#e86056",
        success: "#56e889",
        "dark-background": "#191a1f", 
        "dark-text": "#f6f6f6",
        "dark-border": "#1f222b",
        "dark-secondary": "#2a2b30",
        "dark-simmer": {
          100: "#2a2b30",
          200: "#34363d",
        },
      },
    },
  },
  plugins: [],
};
