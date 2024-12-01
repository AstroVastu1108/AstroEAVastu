import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family'

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    extend: {
      fontFamily: {
        'ea-n': ['ea-n', 'sans-serif'], // Add the custom font family 'ea-n'
        'ea-sb': ['ea-sb', 'sans-serif'], // Add the custom font family 'ea-sb'
      }
    }
  }
}

export default config
