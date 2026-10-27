/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        droid: ['Droid Serif', 'serif'],
      },
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.15)',
          medium: 'rgba(255, 255, 255, 0.22)',
          dark: 'rgba(15, 23, 42, 0.45)',
          border: 'rgba(255, 255, 255, 0.25)',
          borderHover: 'rgba(255, 255, 255, 0.45)',
        },
        agri: {
          emerald: '#10b981',
          leaf: '#059669',
          moss: '#064e3b',
          amber: '#f59e0b',
        }
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
        'red-glow': '0 0 25px rgba(239, 68, 68, 0.65)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
