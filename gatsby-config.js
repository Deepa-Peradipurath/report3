// let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
// require("dotenv").config({ path: `.env.${activeEnv}` })
// const language = 'en';
// const pathPrefix = process.env.PATH_PREFIX;

module.exports = {
  siteMetadata: {
    title: `Enterprise Notification Application`,
    description: `Pepsico - UI Notification Admin - Enterprise Notification Application `,
    author: `Pepsico`,
    //deployment: process.env.DEPLOYMENT_ENV,
  },
  //pathPrefix,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    'gatsby-plugin-sass',
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `red`,
        // Disable the loading spinner.
        showSpinner: true,
      },
    },
    
    // Commenting out the manifest plugin for now
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
  ],
}
