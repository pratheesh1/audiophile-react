const { lightBlue, ...supportedColors } = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "false", // or 'media' or 'class'
  theme: {
    extend: {
      colors: { ...supportedColors },
    },
    backgroundImage: {
      login:
        "url('https://images.unsplash.com/photo-1535925191244-17536ca4f8b6')",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
