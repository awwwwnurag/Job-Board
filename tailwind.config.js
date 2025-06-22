/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1e9c6b', // lighter Starbucks green
          DEFAULT: '#00704A', // Starbucks green
          dark: '#004d34', // darker Starbucks green
        },
        background: '#f8fafc', // off-white
        surface: '#ffffff',
        text: {
          DEFAULT: '#22292f', // dark slate
          light: '#64748b', // slate-400
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(31, 41, 55, 0.08)',
      },
      backgroundImage: {
        'header-green': 'linear-gradient(90deg, #1e9c6b 0%, #00704A 60%, #004d34 100%)',
      },
    },
  },
  plugins: [],
};
