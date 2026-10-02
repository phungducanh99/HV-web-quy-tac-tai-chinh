/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        haivan: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0052cc',
          600: '#0041a8',
          700: '#003385',
          800: '#002666',
          900: '#0a192f',
        },
      },
    },
  },
  plugins: [],
}
