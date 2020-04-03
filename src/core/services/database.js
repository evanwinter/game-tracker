import firebase from "gatsby-plugin-firebase"
import { forDb } from "@utils"
import cache from "./cache"

const Database = {
	getCollectionAsArray: async function(collection) {
		let arr = []

		try {
			const collectionRef = await firebase
				.firestore()
				.collection(collection)
				.get()
			collectionRef.forEach((doc) => arr.push(doc.data()))
			return arr
		} catch (err) {
			throw new Error("An error occurred fetching data from Firebase", err)
		}
	},

	fetchGames: async function() {
		// Check IndexedDB first
		const cachedGames = await cache.retrieve("games")
		if (!!cachedGames) {
			console.log("Using cache for games", cachedGames)
			return cachedGames
		} else {
			console.log("Fetching games from Firebase...")
		}

		// Otherwise, fetch from Firebase
		const games = await this.getCollectionAsArray("games")
		const titles = games.map((game) => game && game.title)

		// save to IndexedDB
		await cache.store("games", titles)

		return titles
	},

	fetchPlayers: async function() {
		// Check IndexedDB first
		const cachedPlayers = await cache.retrieve("players")
		if (!!cachedPlayers) {
			console.log("Using cache for players", cachedPlayers)
			return cachedPlayers
		} else {
			console.log("Fetching players from Firebase...")
		}

		// Otherwise, fetch from Firebase
		const players = await this.getCollectionAsArray("players")
		const names = players.map((player) => player && player.name)

		// save to IndexedDB
		await cache.store("players", names)

		return names
	},

	fetchResults: async function() {
		const results = await this.getCollectionAsArray("result")
		return results
	},

	saveGameResult: async function(result) {
		if (!result) return

		try {
			await firebase
				.firestore()
				.collection("results")
				.add(result)
		} catch (err) {
			throw new Error(
				`An error occurred adding game results (${result.game} won by ${result.winner}) to Firebase`,
				err,
			)
		}
	},

	saveNewGame: async function(gameTitle) {
		if (!gameTitle) return

		const game = { title: forDb(gameTitle) }
		try {
			await firebase
				.firestore()
				.collection("games")
				.add(game)

			const cachedGames = await cache.retrieve("games")
			if (cachedGames) {
				await cache.store("games", [...cachedGames, game.title])
			}
		} catch (err) {
			throw new Error(
				`An error occurred adding ${game.title} as a new game in Firebase`,
				err,
			)
		}
	},

	saveNewPlayer: async function(playerName) {
		if (!playerName) return

		const player = { name: forDb(playerName) }
		try {
			await firebase
				.firestore()
				.collection("players")
				.add(player)

			const cachedPlayers = await cache.retrieve("players")
			if (cachedPlayers) {
				await cache.store("players", [...cachedPlayers, player.name])
			}
		} catch (err) {
			throw new Error(
				`An error occurred adding ${player.name} as a new player in Firebase`,
				err,
			)
		}
	},
}

export default Database
