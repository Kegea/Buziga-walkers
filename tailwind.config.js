/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#4d96ff',
          600: '#3d7ae6',
        },
        secondary: {
          500: '#e6b800',
          600: '#d4a600',
        },
        accent: {
          500: '#c4a939',
        },
        background: '#fefefe',
      }
    },
  },
  plugins: [],
};