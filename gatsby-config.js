const activeEnv = process.env.NODE_ENV || 'development'
console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const drupalBaseUrl = process.env.DRUPAL_BASE_URL

module.exports = {
  siteMetadata: {
    siteUrl: `https://localhost:8000`, // TODO : change siteUrl to actual name or find it via graphql or so (8000 for DEV, 9000 for gatsby serve)
    title: `Synaptor V5`,
    siteName: `thecellguys.com`,
    description: `No Synapsis, No Learning!`,
    author: `@cslavenc`,
    twitterHandle: '@my-twitter-handle',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    /*{
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `{
          allSitePage {
            edges {
              node {
                id
                slug: path
              }
            }
          }
        }`,
      },
    },*/
    {
      resolve: 'gatsby-plugin-remove-console',
      options: {
        exclude: ['error', 'warn'], // remove all console calls except these
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
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: process.env.DRUPAL_BASE_URL,
      },
    },
    {
      // TODO : AW (adsense) if needed
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GA_TRACKING_ID, // Google Analytics / GA
          //"AW-CONVERSION_ID", // Google Ads / Adwords / AW
        ],
        pluginConfig: {
          head: true,
          exclude: ['/node/*'],
        },
      },
    },
    // TODO : check if these things are necessary
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // and also: gatsby-plugin-manifest (check out Web App Manifest)
  ],
}
