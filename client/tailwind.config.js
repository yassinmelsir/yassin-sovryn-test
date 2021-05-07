module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],   
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'mainbg': '#171617',
        'nav': '#010100',
        'walletBg': '#383838',
        'engage': '#d7a91f',
        'walletExit': '#686969'
      }),
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: theme('colors.gray.300', 'currentColor'),
        'engage': '#d7a91f'
      }),
      textColor: theme => theme('colors'),
      textColor: {
        'engage': '#d7a91f',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
