const baseColors = {
  brand: {
    50: '#eff8ff',
    100: '#daefff',
    200: '#bee4ff',
    300: '#91d5ff',
    400: '#5ebbfc',
    500: '#389df9',
    600: '#227fee',
    700: '#1a68db',
    800: '#1c54b1',
    900: '#1c498c',
    950: '#162d55'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d0d5dc',
    400: '#9ba3b0',
    500: '#6a7282',
    600: '#495565',
    700: '#354153',
    800: '#1d2939',
    900: '#0f1729',
    950: '#020713'
  },
  red: {
    50: '#fdf3f3',
    100: '#fde3e3',
    200: '#fccccc',
    300: '#f8a9a9',
    400: '#f27777',
    500: '#e53939',
    600: '#d42e2e',
    700: '#b22323',
    800: '#932121',
    900: '#7b2121',
    950: '#420d0d'
  },
  yellow: {
    50: '#fffeea',
    100: '#fffcc5',
    200: '#fff885',
    300: '#ffee46',
    400: '#ffe01b',
    500: '#f5bd00',
    600: '#e29900',
    700: '#bb6d02',
    800: '#985308',
    900: '#7c440b',
    950: '#482300'
  },
  green: {
    50: '#f2fbf2',
    100: '#e2f6e2',
    200: '#c6ecc7',
    300: '#9adb9d',
    400: '#66c26a',
    500: '#41a646',
    600: '#318835',
    700: '#296c2c',
    800: '#255628',
    900: '#204723',
    950: '#0d260f'
  }
};

const semanticColors = {
  white: '#ffffff',
  black: baseColors.gray[900],

  // Brand surfaces and accents
  brand: baseColors.brand[700],
  'brand-strong': baseColors.brand[800],
  'brand-soft': baseColors.brand[100],
  'brand-softer': baseColors.brand[50],
  'brand-medium': baseColors.brand[200],

  // Neutral surfaces and text
  surface: '#ffffff',
  'surface-soft': baseColors.gray[50],
  'surface-muted': baseColors.gray[100],
  primary: '#ffffff',
  secondary: baseColors.gray[50],
  ternary: baseColors.gray[100],
  dark: baseColors.gray[800],
  'dark-strong': baseColors.gray[900],
  ink: baseColors.gray[900],
  'ink-body': baseColors.gray[600],
  'ink-subtle': baseColors.gray[500],

  // Status colors
  success: baseColors.green[700],
  'success-strong': baseColors.green[900],
  'success-soft': baseColors.green[100],
  'success-medium': baseColors.green[200],
  warning: baseColors.yellow[400],
  'warning-strong': baseColors.yellow[600],
  'warning-soft': baseColors.yellow[100],
  'warning-medium': baseColors.yellow[200],
  danger: baseColors.red[700],
  'danger-strong': baseColors.red[900],
  'danger-soft': baseColors.red[100],
  'danger-medium': baseColors.red[200],

  // Border semantics
  line: baseColors.gray[200],
  'line-subtle': baseColors.gray[100],
  'line-medium': baseColors.gray[300],
  'line-strong': baseColors.gray[400],
  'line-brand': baseColors.brand[700],
  'line-brand-soft': baseColors.brand[200],
  'line-danger': baseColors.red[700],
  'line-danger-soft': baseColors.red[200],
  'line-warning': baseColors.yellow[400],
  'line-warning-soft': baseColors.yellow[200],
  'line-success': baseColors.green[700],
  'line-success-soft': baseColors.green[200]
};

module.exports = {
  content: ['./src/**/*.{html,ts,css}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        ...baseColors,
        ...semanticColors
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif']
      }
    }
  },
  plugins: []
};
