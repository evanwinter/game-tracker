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
			collectionRef.forEach((doc) => {
				console.log(doc.data())
				arr.push(doc.data())
			})
			return arr
		} catch (err) {
			throw Error("An error occurred fetching data from Firebase", err)
		}
	},

	/**
	 * Fetch games from Firebase. Checks IndexedDB for cached values first, and if
	 * not found or if cache is expired, fetch new data from Firebase.
	 */
	fetchGames: async function() {
		// Check IndexedDB first
		const cachedGames = await cache.retrieve("games")
		if (!!cachedGames) {
			// console.log("Using cache for games", cachedGames)
			return cachedGames
		} else {
			// console.log("Fetching games from Firebase...")
		}

		// Otherwise, fetch from Firebase
		const games = await this.getCollectionAsArray("games")
		const titles = games.map((game) => game && game.title)

		// save to IndexedDB
		await cache.store("games", titles)
		await cache.setLastFetched("games")

		return titles
	},

	/**
	 * Fetch players from Firebase. Checks IndexedDB for cached values first, and if
	 * not found or if cache is expired, fetch new data from Firebase.
	 */
	fetchPlayers: async function() {
		// Check IndexedDB first
		const cachedPlayers = await cache.retrieve("players")
		if (!!cachedPlayers) {
			// console.info("Using cache for players", cachedPlayers)
			return cachedPlayers
		}

		// Otherwise, fetch from Firebase
		// console.info("Fetching players from Firebase...")
		const players = await this.getCollectionAsArray("players")
		const names = players.map((player) => player && player.name)

		// save to IndexedDB
		await cache.store("players", names)
		await cache.setLastFetched("players")

		return names
	},

	/**
	 * Fetch results from Firebase, returned as an array of objects.
	 */
	fetchResults: async function() {
		const results = await this.getCollectionAsArray("result")
		return results
	},

	/**
	 * Save a game result to Firebase.
	 */
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

	/**
	 * Save a new game to Firebase.
	 */
	saveNewGame: async function(gameTitle) {
		if (!gameTitle) return

		const game = { title: forDb(gameTitle) }
		try {
			await firebase
				.firestore()
				.collection("games")
				.add(game)

			// add game to indexeddb cache so its displayed before cache expiration
			await cache.appendCacheValue("games", forDb(game.title))
		} catch (err) {
			throw new Error(
				`An error occurred adding ${game.title} as a new game in Firebase`,
				err,
			)
		}
	},

	/**
	 * Save a new player to Firebase.
	 */
	saveNewPlayer: async function(playerName) {
		if (!playerName) return

		const player = { name: forDb(playerName) }
		try {
			await firebase
				.firestore()
				.collection("players")
				.add(player)

			// add player to indexeddb cache so its displayed before cache expiration
			await cache.appendCacheValue("players", forDb(player.name))
		} catch (err) {
			throw new Error(
				`An error occurred adding ${player.name} as a new player in Firebase`,
				err,
			)
		}
	},

	saveNewItem: async function(dataKey, value) {
		if (!dataKey || !value) return
		const keys = { players: "name", games: "title" }
		const key = keys[dataKey]
		const item = {
			[key]: forDb(value),
		}

		try {
			await firebase
				.firestore()
				.collection(dataKey)
				.add(item)

			await cache.appendCacheValue(dataKey, forDb(value))
		} catch (err) {
			throw new Error(
				`An error occurred adding ${JSON.stringify(
					item,
				)} to ${dataKey} collection in Firebase`,
			)
		}
	},
}

export default Database
