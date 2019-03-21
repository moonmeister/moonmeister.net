const path = require('path');

module.exports = {
  resolve: {
    alias: {
      src: path.join(__dirname, 'src'),
      components: path.join(__dirname, 'src/components'),
      images: path.join(__dirname, 'src/images'),
      pages: path.join(__dirname, 'src/pages'),
      styles: path.join(__dirname, 'src/styles'),
    },
  },
};
