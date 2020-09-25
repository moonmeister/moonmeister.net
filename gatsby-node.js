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

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions: { setWebpackConfig },
}) => {
  console.log(JSON.stringify(rules, null, 2));
  //   module: {
  //     rules: [
  //       {
  //         test: 'my-css',
  //         use: [loaders.style(), loaders.css()],
  //       },
  //     ],
  //   },
  // });
};
