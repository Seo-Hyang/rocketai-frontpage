/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: { max: "349px" },
      sm: "350px",
      md: "380px",
      lg: "410px",
    },
  },
  plugins: [],
};
