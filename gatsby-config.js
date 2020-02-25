module.exports = {
  siteMetadata: {
    title: `Alex Moon`,
    description: `Personal Website`,
    author: `@moon_meister`,
    siteUrl: 'https://moonmeister.net',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: process.env.WPGRAPHQL_URL || `http://moonmeister.local/graphql`,
        verbose: true,
        // for wp-graphql-gutenberg, attributes currently breaks due
        // to the origin schema. It works if we exclude attributes
        excludeFields: [`attributes`],
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
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-react-helmet',

    `gatsby-plugin-emotion`,
    `gatsby-plugin-preact`,
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
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', disallow: '/admin' },
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
        icon: `src/images/terminal-solid.svg`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
};
