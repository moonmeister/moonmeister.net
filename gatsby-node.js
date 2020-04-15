/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const createBlog = require('./gatsby/createBlog');

exports.createPages = async (nodeApi) => {
  await Promise.all([createBlog(nodeApi)]);
};

/* This const and the custom webpack config modifies the
 new framework bundle to include preact.

 This may not be needed soon if it's been fixed. See:

 https://github.com/gatsbyjs/gatsby/issues/19943
 */
const FRAMEWORK_BUNDLES = [
  `preact`,
  `react`,
  `react-dom`,
  `scheduler`,
  `prop-types`,
];

exports.onCreateWebpackConfig = ({ stage, getConfig, actions }) => {
  if (stage === 'build-javascript') {
    const config = getConfig();

    config.optimization.splitChunks.cacheGroups.framework.test = new RegExp(
      `(?<!node_modules.*)[\\\\/]node_modules[\\\\/](${FRAMEWORK_BUNDLES.join(
        `|`
      )})[\\\\/]`
    );

    actions.replaceWebpackConfig(config);
  }
};
