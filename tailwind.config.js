const { lightBlue, ...supportedColors } = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "false", // or 'media' or 'class'
  theme: {
    extend: {
      colors: { ...supportedColors },
      keyframes: {
        wiggle: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(2deg)" },
          "75%": { transform: "rotate(-2deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
    backgroundImage: {
      login:
        "url('https://images.unsplash.com/photo-1535925191244-17536ca4f8b6')",
      hero: "url('https://res.cloudinary.com/dvam3s15z/image/upload/v1638590647/ogr1hnypsdfeijdsqpv0.jpg')",
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
