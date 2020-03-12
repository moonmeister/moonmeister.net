/* eslint-disable no-use-before-define */
const twTypography = require('tailwindcss-typography');

const curlSizeWidth = '6vw';
const curlSizeHeight = '4vw';

const tWconfig = {
  theme: {
    textShadow: theme => ({
      default: `2px 2px 4px ${theme('colors.gray.900')}`,
      lg: '0 2px 10px rgba(0, 0, 0, 0.5)',
      sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      none: 'none',
    }),
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1800px',
    },
    extend: {
      colors: {
        inherit: 'inherit',
        gray: {
          '100': 'hsla(190, 5%, 95%, 1)',
          '200': 'hsla(190, 5%, 88%, 1)',
          '300': 'hsla(190, 5%, 75%, 1)',
          '400': 'hsla(190, 5%, 62%, 1)',
          '500': 'hsla(190, 5%, 50%, 1)',
          '600': 'hsla(190, 5%, 40%, 1)',
          '700': 'hsla(190, 5%, 30%, 1)',
          '800': 'hsla(190, 5%, 20%, 1)',
          '900': 'hsla(190, 5%, 10%, 1)',
        },
        primary: {
          '100': '#cc9cfc',
          '200': '#ccc3d5',
          '300': '#b3a5c0',
          '400': '#9988aa',
          '500': '#806a95',
          '600': '#665577',
          '700': '#4d3f5a',
          '800': '#332a3c',
          '900': '#1a151e',
        },
      },
      translate: {
        sm: '4px',
        '-sm': '-4px',
      },
      width: {
        curl: curlSizeWidth,
      },
      boxShadow: {
        footer: 'inset 0px 10px 10px -10px hsla(0, 0%, 5%, 1);',
      },
      height: {
        curl: curlSizeHeight,
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

Object.keys(tWconfig.theme.screens).forEach(key => {
  tWconfig.mq[key] = `@media (min-width: ${screens[key]})`;
});
module.exports = tWconfig;
