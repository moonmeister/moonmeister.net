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
      main: 'hsla(0, 0%, 94%, 1)',
      text: { default: '#221111', lighter: '#eee' },
      shadow: 'hsla(0, 0%, 30%, 0.9)',
      purple: '#665577',
    },
    extend: {
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
