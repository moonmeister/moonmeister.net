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
        verbose: true,
        // for wp-graphql-gutenberg, attributes currently breaks due
        // to the origin schema. It works if we exclude attributes
        excludeFieldNames: [`attributes`],
        schema: {
          queryDepth: 5,
          typePrefix: `Wp`,
        },
        develop: {
          nodeUpdateInterval: 3000,
        },
        debug: {
          graphql: {
            showQueryOnError: false,
            showQueryVarsOnError: false,
            copyQueryOnError: false,
            panicOnError: false,
            // a critical error is a WPGraphQL query that returns an error and response data. Currently WPGQL will error if we try to access private posts so if this is false it returns a lot of irrelevant errors.
            onlyReportCriticalErrors: true,
          },
        },
        type: {
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

    /* Third Party Integration Plugins */
    `gatsby-plugin-postcss`,
    `gatsby-plugin-preact`,
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
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': [
            'Access-Control-Allow-Origin: https://translate.googleusercontent.com',
            'Access-Control-Allow-Credentials: true',
            'Content-Security-Policy: frame-ancestors https://translate.google.com',
            'X-Frame-Options: ALLOW-FROM https://translate.google.com',
          ],
        },
        mergeSecurityHeaders: false,
      },
    },
    {
      resolve: `gatsby-plugin-ackee-tracker`,
      options: {
        domainId: isProduction ? TRACKING_IDS.PROD : TRACKING_IDS.DEV,
        server: 'https://track.moonmeister.net',
        ignoreOwnVisits: isProduction,
        ignoreLocalhost: isProduction,
        detailed: true,
      },
    },

    /* Misc Utilities to generate misc site related structured content */
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/blog'],
        query: `
        {
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
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
            query: `
              {
                allWpPost(
                  filter: {uri: {glob: "/blog/*"}}
                  sort: {fields: [dateGmt], order: DESC}
                ) {
                  nodes {
                    title
                    dateGmt
                    uri
                    excerpt
                    tags {
                      nodes{
                        name
                      }
                    }
                    author{
                      node {
                        name
                      }
                    }
                  }
                }
              }
            `,
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

    // Bundle stats reporting plugins
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'static',
        production: true,
        openAnalyzer: false,
      },
    },
    'gatsby-plugin-webpack-size',
    'gatsby-plugin-relative-ci',
  ],
};
