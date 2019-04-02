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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#efefef`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/headshot.jpg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    'gatsby-plugin-eslint',
    'gatsby-plugin-sitemap', // https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/
    {
      resolve: 'gatsby-plugin-robots-txt', // https://www.gatsbyjs.org/packages/gatsby-plugin-robots-txt/
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using 'gatsby develop'
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    `gatsby-plugin-netlify`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
