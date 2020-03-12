/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const createBlog = require('./gatsby/createBlog');

exports.createPages = async nodeApi => {
  await Promise.all([createBlog(nodeApi)]);
};
