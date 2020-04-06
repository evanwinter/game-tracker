require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})

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
					"@styles": "src/styles",
					"@actions": "src/core/state/actions.js",
					"@services": "src/core/services",
					"@state": "src/core/state",
					"@types": "src/core/state/types.js",
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

		// Firebase plugin
		{
			resolve: "gatsby-plugin-firebase",
			options: {
				credentials: {
					apiKey: process.env.GATSBY_FIREBASE_API_KEY,
					authDomain: "game-tracker-58601.firebaseapp.com",
					databaseURL: "https://game-tracker-58601.firebaseio.com",
					projectId: "game-tracker-58601",
					storageBucket: "game-tracker-58601.appspot.com",
					messagingSenderId: "545153584949",
					appId: "1:545153584949:web:1b8c3f1fb5c1734b1f067c",
					measurementId: "G-2NPZF7FPSV",
				},
				features: {
					auth: true,
				},
			},
		},
	],
}
