/* eslint-disable no-use-before-define */
const curlSizeWidth = '6vw';
const curlSizeHeight = '4vw';

const config = {
  theme: {
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
        '900': '',
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
      display: {
        inherit: 'inherit',
      },

      width: {
        curl: curlSizeWidth,
      },
      height: {
        curl: curlSizeHeight,
      },
    },
  },
  variants: {},
  plugins: [],
};

const { screens } = config.theme;

config.mq = {};

Object.keys(config.theme.screens).forEach(key => {
  config.mq[key] = `@media (min-width: ${screens[key]})`;
});
module.exports = config;
