/* eslint-disable global-require */
const tWconfig = {
  content: ['./src/**/*.js'],
  theme: {
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
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

const { screens } = tWconfig.theme;

tWconfig.mq = {};

Object.keys(tWconfig.theme.screens).forEach((key) => {
  tWconfig.mq[key] = `@media (min-width: ${screens[key]})`;
});

module.exports = tWconfig;
