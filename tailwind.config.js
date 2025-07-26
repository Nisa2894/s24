module.exports = {
  purge: ['./public/**/*.html', './public/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          500: '#10b981', // Lighter green for buttons (e.g., WhatsApp)
          600: '#059669', // Primary green for headers, buttons
          700: '#047857', // Darker green for hover states
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
