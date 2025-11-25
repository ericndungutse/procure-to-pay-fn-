/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#b07c19',
        'primary-light': '#d6a87e',
        secondary: '#031B28',
        'secondary-light': '#2a3e4d', // Light version of the secondary color
      },
      keyframes: {
        rotate: {
          to: { transform: 'rotate(1turn)' },
        },
      },
      animation: {
        rotate: 'rotate 1.5s infinite linear',
      },
    },
  },
  plugins: [],
};
