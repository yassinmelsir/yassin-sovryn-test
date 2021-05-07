module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],   
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '20vw': '20vw',
        '30vw': '30vw',
        '50vw': '50vw'
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'mainbg': '#171617',
        'nav': '#010100',
        'menu': '#101111',
        'walletBg': '#383838',
        'engage': '#d7a91f',
        'walletExit': '#686969',
        'unSelectedTokenMenu': '#111519',
        'selectedTokenMenu': '#18425a',
        'buttonColor': '#4d3d0c',
        'activated': '#ffc005'

      }),
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: theme('colors.gray.300', 'currentColor'),
        'engage': '#d7a91f',
        'hueBlue': '#1a4e6d',
        'mainbg': '#171617',
        'activated': '#ffc005'

      }),
      height: {
        '500': '500px'
      },
      textColor: theme => theme('colors'),
      textColor: {
        'engage': '#d7a91f',
        'activated': '#ffc005'
      }
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
