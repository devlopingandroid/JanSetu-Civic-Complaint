/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Open Sans', 'Lato', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e8f5e8',
          100: '#c8e6c8',
          500: '#2E7D32',
          600: '#1b5e20',
          700: '#1b5e20',
        },
        secondary: {
          50: '#F5F5F0',
          100: '#EDEDE9',
          200: '#e0e0dc',
        },
        accent: {
          teal: '#26A69A',
          amber: '#FFA726',
          rose: '#D81B60',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.25)',
          dark: 'rgba(0, 0, 0, 0.1)',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '14px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      }
    },
  },
  plugins: [],
}
