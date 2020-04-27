/* eslint-disable no-param-reassign */
const path = require(`path`);

module.exports = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const {
    data: {
      allWpPost: { edges: allPosts },
    },
  } = await graphql(`
    {
      allWpPost {
        edges {
          next {
            uri
            databaseId
          }
          previous {
            uri
            databaseId
          }
          node {
            uri
            databaseId
          }
        }
      }
    }
  `);

  const blogPostTemplate = path.resolve(`./src/templates/blogPost.js`);

  allPosts.forEach(({ node: post, next, previous }) => {
    const { uri } = post;
    reporter.verbose(`create post: ${uri}`);

    createPage({
      path: `${uri}`,
      component: blogPostTemplate,
      context: {
        ...post,
        next,
        previous,
      },
    });
  });
  reporter.info(`created ${allPosts.length} blog posts`);

  reporter.info(`created ${1} blog pages`);
};
