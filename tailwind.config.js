const { lightBlue, ...supportedColors } = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "false", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: { ...supportedColors },
    },
  },
  plugins: [],
};
