/* eslint-disable no-use-before-define */
const twTypography = require('tailwindcss-typography');
const colors = require('tailwindcss/colors')

const tWconfig = {
  purge: ['./src/**/*.js'],
  theme: {
    textShadow: (theme) => ({
      DEFAULT: `2px 2px 4px ${theme('colors.gray.900')}`,
      lg: '0 2px 10px rgba(0, 0, 0, 0.5)',
      sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      none: 'none',
    }),
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1800px',
      canhover: { raw: '(hover: hover)' },
    },
    extend: {
      transitionProperty: {
        layout: 'margin, padding, height, width',
      },
      colors: {
        inherit: 'inherit',
        teal: colors.teal,
        gray: {
          100: 'hsla(190, 5%, 95%, 1)',
          200: 'hsla(190, 5%, 88%, 1)',
          300: 'hsla(190, 5%, 75%, 1)',
          400: 'hsla(190, 5%, 62%, 1)',
          500: 'hsla(190, 5%, 50%, 1)',
          600: 'hsla(190, 5%, 40%, 1)',
          700: 'hsla(190, 5%, 30%, 1)',
          800: 'hsla(190, 5%, 20%, 1)',
          900: 'hsla(190, 5%, 10%, 1)',
        },
        primary: {
          100: 'hsl(270, 18%, 90%)',
          200: 'hsl(270, 18%, 80%)',
          300: 'hsl(271, 18%, 70%)',
          400: 'hsl(270, 17%, 60%)',
          500: 'hsl(271, 17%, 50%)',
          600: 'hsl(270, 17%, 40%)',
          700: 'hsl(271, 18%, 30%)',
          800: 'hsl(270, 18%, 20%)',
          900: 'hsl(273, 18%, 15%)',
        },
      },
      translate: {
        sm: '4px',
        '-sm': '-4px',
      },
      boxShadow: {
        footer: 'inset 0px 10px 10px -10px hsla(0, 0%, 5%, 1);',
      },
      maxWidth: {
        reading: '100ch',
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'group-hover'],
    transitionDuration: ['responsive', 'group-hover'],
    transitionProperty: ['responsive', 'group-hover'],
    transitionTimingFunction: ['responsive', 'group-hover'],
  },
  plugins: [twTypography({})],
};

const { screens } = tWconfig.theme;

tWconfig.mq = {};

Object.keys(tWconfig.theme.screens).forEach((key) => {
  tWconfig.mq[key] = `@media (min-width: ${screens[key]})`;
});


module.exports = tWconfig;
