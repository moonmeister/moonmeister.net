module.exports = {
  siteMetadata: {
    title: `Alex Moon Personal`,
    description: `Personal Website`,
    author: `@moon_meister`,
    siteUrl: 'https://moonmeister.net',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/uploads`,
        name: 'uploads',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/blog`,
        name: 'blog',
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alex Moon Website`,
        short_name: `Alex Moon`,
        start_url: `/`,
        background_color: `#f0f0f0`,
        theme_color: `#665577`,
        display: `minimal-ui`,
        icon: `src/images/terminal-solid.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    'gatsby-plugin-eslint',
    'gatsby-plugin-sitemap', // https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/
    {
      resolve: 'gatsby-plugin-robots-txt', // https://www.gatsbyjs.org/packages/gatsby-plugin-robots-txt/
      options: {
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', block: '/admin' },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: false, // Enable while using 'gatsby develop'
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cms`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
};
