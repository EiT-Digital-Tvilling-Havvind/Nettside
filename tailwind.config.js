module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '88': '22rem',
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
      },
      minHeight: {
        '32': '8rem',
      },
      minWidth: {
        '48': '12rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
