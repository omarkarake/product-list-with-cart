module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        red: '#C73B0F',
        rose: {
          900: '#260F08',
          500: '#87635A',
          400: '#AD8A85',
          300: '#CAAFA7',
          100: '#F5EEEC',
          50: '#FCF8F6',
        },
        green: '#1EA575',
        black: '#000000',
        white: '#FFFFFF',
      },
      fontFamily: {
        'red-hat': ['"Red Hat Text"', 'sans-serif'],
      },
      spacing: {
        1100: '88px',
        500: '40px',
        400: '32px',
        300: '24px',
        200: '16px',
        150: '12px',
        100: '8px',
        50: '4px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-preset-1-bold': {
          fontSize: '56px',
          lineHeight: '120%',
          letterSpacing: '0px',
          fontWeight: '700', // Bold
          fontFamily: '"Red Hat Text", sans-serif',
        },
        '.text-preset-2-bold': {
          fontSize: '24px',
          lineHeight: '125%',
          letterSpacing: '0px',
          fontWeight: '700', // Bold
          fontFamily: '"Red Hat Text", sans-serif',
        },
        '.text-preset-3-semibold': {
          fontSize: '16px',
          lineHeight: '150%',
          letterSpacing: '0px',
          fontWeight: '600', // Semi Bold
          fontFamily: '"Red Hat Text", sans-serif',
        },
        '.text-preset-4-regular': {
          fontSize: '14px',
          lineHeight: '150%',
          letterSpacing: '0px',
          fontWeight: '400', // Regular
          fontFamily: '"Red Hat Text", sans-serif',
        },
        '.text-preset-4-semibold': {
          fontSize: '14px',
          lineHeight: '150%',
          letterSpacing: '0px',
          fontWeight: '600', // Semi Bold
          fontFamily: '"Red Hat Text", sans-serif',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}