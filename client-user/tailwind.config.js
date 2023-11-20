/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#080808",
        "[#E61B1F]": "#E61B1F",
        "[#2C2C2C]": "#2C2C2C",
        "[#FFFFFF]": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
