const typography = fontFamily => ({
  fontFamily:
    typeof fontFamily === 'undefined' || fontFamily === ''
      ? [
          'ea-n',
          'ea-sb',
          '"Public Sans"',
          'sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
        ].join(',')
      : fontFamily,
  fontSize: 13.125,
  h1: {
    fontFamily:'ea-sb',
    fontSize: '2.875rem',
    // fontWeight: 500,
    lineHeight: 1.47826
  },
  h2: {
    fontFamily:'ea-sb',
    fontSize: '2.375rem',
    // fontWeight: 500,
    lineHeight: 1.47368421
  },
  h3: {
    fontFamily:'ea-sb',
    fontSize: '1.75rem',
    // fontWeight: 500,
    lineHeight: 1.5
  },
  h4: {
    fontFamily:'ea-sb',
    fontSize: '1.5rem',
    // fontWeight: 500,
    lineHeight: 1.58334
  },
  h5: {
    fontFamily:'ea-sb',
    fontSize: '1.125rem',
    // fontWeight: 500,
    lineHeight: 1.5556
  },
  h6: {
    fontFamily:'ea-sb',
    fontSize: '0.9375rem',
    // fontWeight: 500,
    lineHeight: 1.46667
  },
  subtitle1: {
    fontFamily:'ea-sb',
    fontSize: '0.9375rem',
    lineHeight: 1.46667
  },
  subtitle2: {
    fontFamily:'ea-sb',
    fontSize: '0.8125rem',
    // fontWeight: 400,
    lineHeight: 1.53846154
  },
  body1: {
    fontFamily:'ea-sb',
    fontSize: '0.9375rem',
    lineHeight: 1.46667
  },
  body2: {
    fontFamily:'ea-sb',
    fontSize: '0.8125rem',
    lineHeight: 1.53846154
  },
  button: {
    fontFamily:'ea-sb',
    fontSize: '0.9375rem',
    lineHeight: 1.46667,
    textTransform: 'none'
  },
  caption: {
    fontFamily:'ea-sb',
    fontSize: '0.8125rem',
    lineHeight: 1.38462,
    letterSpacing: '0.4px'
  },
  overline: {
    fontFamily:'ea-sb',
    fontSize: '0.75rem',
    lineHeight: 1.16667,
    letterSpacing: '0.8px'
  }
})

export default typography
