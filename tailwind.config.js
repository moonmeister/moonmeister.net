/* eslint-disable no-use-before-define */
const twTypography = require('tailwindcss-typography');
const plugin = require('tailwindcss/plugin');

const curlSizeWidth = '6vw';
const curlSizeHeight = '4vw';

const tWconfig = {
  theme: {
    textShadow: theme => ({
      default: `2px 2px 4px ${theme('colors.gray.900')}`,
      lg: '0 2px 10px rgba(0, 0, 0, 0.5)',
      none: 'none',
    }),
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1800px',
    },
    colors: {
      inherit: 'inherit',
      gray: {
        '100': 'hsla(190, 5%, 90%, 1)',
        '200': '',
        '300': 'hsla(190, 5%, 70%, 1)',
        '400': '',
        '500': 'hsla(190, 5%, 50%, 1)',
        '600': '',
        '700': '',
        '800': '',
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
    extend: {
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
  variants: {},
  plugins: [
    twTypography({}),
    plugin(({ addBase, config }) => {
      addBase({
        h1: { fontSize: config('theme.fontSize.2xl') },
        h2: { fontSize: config('theme.fontSize.xl') },
        h3: { fontSize: config('theme.fontSize.lg') },
      });
    }),
  ],
};

const { screens } = tWconfig.theme;

tWconfig.mq = {};

Object.keys(tWconfig.theme.screens).forEach(key => {
  tWconfig.mq[key] = `@media (min-width: ${screens[key]})`;
});
module.exports = tWconfig;
