const path = require(`path`);

/**
 * This function creates all the individual blog pages in this site
 */
async function createIndividualBlogPostPages({ posts, gatsbyUtilities }) {
  return Promise.all(
    posts.map(({ previous, post, next }) =>
      gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve(`./src/templates/WpPost.js`),
        context: {
          id: post.id,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  );
}

async function createIndividualTagPages({ tags, gatsbyUtilities }) {
  return Promise.all(
    tags.map(({ tag }) =>
      gatsbyUtilities.actions.createPage({
        path: tag.uri,
        component: path.resolve(`./src/templates/WpTag.js`),
        context: {
          id: tag.id,
        },
      })
    )
  );
}

async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          post: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, graphqlResult.errors);
    return [];
  }

  return graphqlResult.data.allWpPost.edges;
}

async function getTags({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpTags {
      allWpTag {
        edges {
          tag: node {
            id
            uri
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, graphqlResult.errors);
    return [];
  }

  return graphqlResult.data.allWpTag.edges;
}

exports.createPages = async (gatsbyUtilities) => {
  const posts = await getPosts(gatsbyUtilities);
  const tags = await getTags(gatsbyUtilities);

  return Promise.all([
    createIndividualBlogPostPages({ posts, gatsbyUtilities }),
    createIndividualTagPages({ tags, gatsbyUtilities }),
  ]);
};
