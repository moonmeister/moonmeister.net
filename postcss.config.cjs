const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');

/* eslint-disable global-require */
module.exports = () => ({
  plugins: [postcssJitProps(OpenProps), require('autoprefixer')],
});
