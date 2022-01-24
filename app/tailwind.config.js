module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { 
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': {opacity: 0},
          '100%': {opacity: 1, transform: 'translate(0px,0px)'}
        },
        fadeIn: {
          '0%': {opacity: 0},
          '100%': {opacity: 1}
        },
        grow: {
          '0%': {height: 0},
          '100%': {height: '100%'}
        }

      },
      animation: {
        fadeInUpFast: 'fadeInUp 0.2s ease-in-out forwards',
        fadeInUp: 'fadeInUp 0.5s ease-in-out forwards',
        fadeIn : 'fadeIn 0.5s ease-in-out forwards',
        grow: 'grow 0.2s linear forwards'
      }
    } 
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
