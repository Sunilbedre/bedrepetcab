/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#052D49',
          dark: '#041A2C',
          light: '#0A3A5C',
          muted: '#33454F',
        },
        teal: {
          DEFAULT: '#0C7F8A',
          bright: '#0FA3B1',
          light: '#7FDBE5',
          soft: '#F6F8FA',
          border: '#E3E9EE',
        },
        coral: {
          DEFAULT: '#C2410C', // FidoJet primary conversion CTA
          bright: '#FB6F4C',
          hover: '#A8380A',
          soft: '#FFF5F2',
        },
        brand: {
          50: '#F6F8FA',
          100: '#E3E9EE',
          500: '#0C7F8A',
          600: '#0FA3B1',
          dark: '#052D49',
        }
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'fj-header': '0 1px 0 rgba(227,233,238,.9), 0 2px 14px rgba(5,45,73,.07)',
        'fj-card': '0 4px 20px -2px rgba(5, 45, 73, 0.06), 0 2px 6px -1px rgba(5, 45, 73, 0.04)',
        'fj-card-hover': '0 18px 44px rgba(5, 45, 73, 0.14)',
        'fj-coral': '0 12px 28px -10px rgba(251, 111, 76, 0.65)',
      }
    },
  },
  plugins: [],
};
