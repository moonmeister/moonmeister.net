/* eslint-disable no-param-reassign */
const path = require(`path`);

module.exports = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const {
    data: {
      wp: {
        readingSettings: { postsPerPage },
      },
    },
  } = await graphql(`
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `);

  const {
    data: {
      allWpPost: { totalCount, edges: allPosts },
    },
  } = await graphql(`
    {
      allWpPost {
        totalCount
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

  const blogTemplate = path.resolve(`./src/templates/blogPage.js`);
  const blogPostTemplate = path.resolve(`./src/templates/blogPost.js`);

  allPosts.forEach(({ node: post, next, previous }) => {
    const { uri } = post;
    reporter.verbose(`create post: ${uri}`);

    createPage({
      path: `/${uri}`,
      component: blogPostTemplate,
      context: {
        ...post,
        next,
        previous,
      },
    });
  });
  reporter.info(`created ${allPosts.length} blog posts`);

  const nodeIds = allPosts.map(({ node }) => node.databaseId);

  createPage({
    path: `/blog/`,
    component: blogTemplate,
    context: {
      nodeIds,
      totalPosts: totalCount,
      postsPerPage,
    },
  });

  reporter.info(`created ${1} blog pages`);
};
