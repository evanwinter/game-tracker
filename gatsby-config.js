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
					"@utils": "src/core/services/utils.js",
					"@types": "src/core/state/types.js",
					"@styles": "src/styles",
					"@data": "sample-data/data.js",
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

		// Source data from Firebase (Firestore)
		{
			resolve: "gatsby-source-firestore",
			options: {
				credential: {
					type: "service_account",
					project_id: "game-tracker-58601",
					private_key_id: process.env.GATSBY_FIRESTORE_PRIVATE_KEY_ID,
					private_key: process.env.GATSBY_FIRESTORE_PRIVATE_KEY,
					client_email:
						"firebase-adminsdk-6txjh@game-tracker-58601.iam.gserviceaccount.com",
					client_id: "103258949462293301450",
					auth_uri: "https://accounts.google.com/o/oauth2/auth",
					token_uri: "https://oauth2.googleapis.com/token",
					auth_provider_x509_cert_url:
						"https://www.googleapis.com/oauth2/v1/certs",
					client_x509_cert_url:
						"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6txjh%40game-tracker-58601.iam.gserviceaccount.com",
				},
				types: [
					{
						type: "Game",
						collection: "games",
						map: (doc) => ({
							title: doc.title,
						}),
					},
					{
						type: "Player",
						collection: "players",
						map: (doc) => ({
							name: doc.name,
						}),
					},
					{
						type: "Result",
						collection: "results",
						map: (doc) => ({
							title: doc.title,
							players: doc.players,
							winner: doc.winner,
							timestamp: doc.timestamp,
						}),
					},
				],
			},
		},
	],
}
