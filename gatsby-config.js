const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://moonmeister.net',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;

const isProduction = NETLIFY_ENV === 'production';
const siteUrl = isProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

const TRACKING_IDS = {
  PROD: 'b704044b-3f9e-4d94-94ee-ff2f2123c8ca',
  DEV: '6375ffb9-0b72-449e-8f5b-64f44d1eb8f4',
};

module.exports = {
  flags: {
    FAST_DEV: true,
  },
  siteMetadata: {
    title: `Alex Moon`,
    description: `Personal Website`,
    author: `@moon_meister`,
    siteUrl,
  },
  plugins: [
    /* Source Plugins */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL || `https://api.moonmeister.net/graphql`,
        excludeFieldNames: [`attributes`],
        schema: {
          queryDepth: 5,
          typePrefix: `Wp`,
        },
        type: {
          MediaItem: {
            createFileNodes: false,
          },
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                50
                : // and we don't actually need more than 1000 in production
                1000,
          },
        },
      },
    },

    /* Data transformer Plugins */
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,

    /* Third Party Integration Plugins */
    `gatsby-plugin-postcss`,
    'gatsby-plugin-react-helmet',

    /* Custom Plugins */
    {
      resolve: `gatsby-plugin-readingtime`,
      options: {
        types: {
          WpPost: (source) => source.content,
        },
      },
    },

    /* Integrate with 3rd parties */
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {},
    },
    /* Misc Utilities to generate misc site related structured content */
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/blog'],
        query: `
        {
          allWpContentNode(filter: { contentTypeName: { in:["post", "page"]}, slug: { ne: "blog" } }) {
            nodes {
              ... on WpPost {
                path: uri
                modifiedGmt
              }
              ... on WpPage {
                path: uri
                modifiedGmt
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allWpContentNode: { nodes } }) => nodes,
        serialize: ({ path, modifiedGmt }) => ({
          url: path,
          lastmod: modifiedGmt,
        }),
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          { userAgent: '*', disallow: '/report.html' },
          { userAgent: '*', allow: '/' },
        ],
        sitemap: `${siteUrl}/sitemap/sitemap-index.xml`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: {
                site,
                allWpPost: { nodes: allPosts },
              },
            }) =>
              allPosts.map(
                ({
                  title,
                  excerpt,
                  uri,
                  dateGmt,
                  author: { node: author },
                  tags,
                }) => ({
                  title,
                  description: excerpt,
                  author: author.name,
                  date: dateGmt,
                  categories: tags.nodes.map((node) => node.name),
                  url: `${site.siteMetadata.siteUrl}${uri}`,
                })
              ),
            query: `{
              allWpPost(filter: {uri: {glob: "/blog/*"}}, sort: {dateGmt: DESC}) {
                nodes {
                  title
                  dateGmt
                  uri
                  excerpt
                  tags {
                    nodes {
                      name
                    }
                  }
                  author {
                    node {
                      name
                    }
                  }
                }
              }
            }`,
            output: '/rss.xml',
            title: "Alex Moon's blog RSS Feed",
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alex Moon`,
        short_name: `Alex`,
        start_url: `/`,
        background_color: `#f0f0f0`,
        theme_color: `#665577`,
        display: `minimal-ui`,
        icon: `src/images/terminal.svg`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
    'gatsby-plugin-relative-ci',
  ],
};
