const path = require("path");

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: path.join(__dirname, `src`, `data`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        '#': path.join(__dirname, "src/#"),
        '@components': path.join(__dirname, "src/@components"),
        '@hooks': path.join(__dirname, "src/@hooks"),
        '@styles': path.join(__dirname, "src/@styles"),
        '@types': path.join(__dirname, "src/@types"),
        '@utils': path.join(__dirname, "src/@utils"),
        pages: path.join(__dirname, "src/pages"),
      },
    },
    {
      resolve: `gatsby-plugin-react-css-modules`,
      options: {
        exclude: `\/global\/`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-theme-material-ui`,
    `gatsby-plugin-no-sourcemaps`,
  ],
};
