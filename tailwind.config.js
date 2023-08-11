module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffd800",
        secondary: "#2a2a2a",
        third: "#f7f8f9",
        "footer-text": "#909090",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("tailwind-fontawesome"),
    require("@tailwindcss/aspect-ratio"),
    require("flowbite/plugin"),
  ],
};
