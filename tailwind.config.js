/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#F8F8F8',
        'dark-gray': '#374151', // Matches text-gray-700 or similar
        'amber': '#FFBF00',     // Accent color from logo and components
        'light-gray': '#E5E7EB', // Matches gray-200, used for borders
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
