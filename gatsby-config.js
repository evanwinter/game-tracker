module.exports = {
  siteMetadata: {
    title: `Game Tracker`,
    description: `Track game results between friends.`,
    author: `Evan Winter`,
  },
  plugins: [
    // PWA Manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Game Tracker`,
        short_name: `Game Tracker`,
        start_url: `/`,
        background_color: `#454545`,
        theme_color: `#e1e1e1`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },

    // Alias imports
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": "src/components",
          "@utils": "src/core/services/utils.js",
          "@types": "src/core/state/types.js",
          "@styles": "src/styles",
        },
        extensions: ["js", "scss"],
      },
    },

    // Offline plugin
    `gatsby-plugin-offline`,

    // Layout plugin (allows page transitions)
    "gatsby-plugin-layout",

    // Use sass
    "gatsby-plugin-sass",

    // Redux plugin
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: "./src/core/state/store",
      },
    },
  ],
}
