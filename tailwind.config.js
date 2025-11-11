/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        'upvote-pink': '#E32787',
        'upvote-orange': '#F37346',
        'upvote-blue': '#2F4792',
      },
      backgroundImage: {
        'gradient-upvote': 'linear-gradient(135deg, #E32787 0%, #F37346 100%)',
      },
    },
  },
  plugins: [],
};
