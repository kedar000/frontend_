/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#033967",      // Regal Blue
        secondary: "#009de0",    // Cerulean
        success: "#24ad5f",      // Jungle Green
        background: "#f2f2f2",   // Concrete
        dark: "#003865",         // Midnight Blue
        borderLight: "#e5e7eb"
      }
    },
  },
  plugins: [],
}