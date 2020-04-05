import firebase from "gatsby-plugin-firebase"
import { forDb } from "@utils"
import T from "@types"
import Cache from "./cache"

const Database = {
	getCollection: async function(collection) {
		let arr = []

		try {
			const collectionRef = await firebase
				.firestore()
				.collection(collection)
				.get()
			collectionRef.forEach((doc) => {
				arr.push(doc.data())
			})

			return arr
		} catch (err) {
			// throw Error("An error occurred fetching data from Firebase", err)
			return arr
		}
	},

	/**
	 * Fetch games from Firebase. Checks IndexedDB for cached values first, and if
	 * not found or if cache is expired, fetch new data from Firebase.
	 */
	fetchGames: async function() {
		const cached = await this.getFromCache(T.DB_KEY_GAMES)
		if (cached) {
			return cached
		}

		const games = await this.getCollection(T.DB_KEY_GAMES)
		const titles = games.map((game) => game && game.title)

		await Cache.set(T.DB_KEY_GAMES, titles)
		await Cache.setLastFetched(T.DB_KEY_GAMES)

		return titles
	},

	/**
	 * Fetch players from Firebase. Checks IndexedDB for cached values first, and if
	 * not found or if cache is expired, fetch new data from Firebase.
	 */
	fetchPlayers: async function() {
		const cachedPlayers = await this.getFromCache(T.DB_KEY_PLAYERS)
		if (cachedPlayers) {
			return cachedPlayers
		}

		const firebasePlayers = await this.getCollection(T.DB_KEY_PLAYERS)
		const names = firebasePlayers.map((player) => player && player.name)

		await Cache.set(T.DB_KEY_PLAYERS, names)
		await Cache.setLastFetched(T.DB_KEY_PLAYERS)

		return names
	},

	getFromCache: async function(dataKey) {
		const cachedItems = await Cache.get(dataKey)
		if (cachedItems && cachedItems.length > 0) {
			console.log(`Cached ${dataKey} found...`)
			const cacheIsStale = await Cache.isStale()
			if (!cacheIsStale) {
				console.log(`Loading cached ${dataKey} into app...`)
				return cachedItems
			}

			console.log(`Cache is stale.`)
		}

		console.log(`No cached ${dataKey} found.`)
		console.log(`Re-fetching data from the network.`)
		return false
	},

	/**
	 * Fetch results from Firebase, returned as an array of objects.
	 */
	fetchResults: async function() {
		const cachedResults = await this.getFromCache(T.DB_KEY_RESULTS)
		if (cachedResults) {
			return cachedResults
		}

		const firebaseResults = await this.getCollection(T.DB_KEY_RESULTS)

		await Cache.set(T.DB_KEY_GAMES, firebaseResults)
		await Cache.setLastFetched(T.DB_KEY_GAMES)

		return firebaseResults
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

	saveNewItem: async function(dataKey, value) {
		if (!dataKey || !value) return
		const keys = { [T.DB_KEY_PLAYERS]: "name", [T.DB_KEY_GAMES]: "title" }
		const key = keys[dataKey]
		const item = {
			[key]: forDb(value),
		}

		try {
			await firebase
				.firestore()
				.collection(dataKey)
				.add(item)

			await Cache.appendCacheValue(dataKey, forDb(value))
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
