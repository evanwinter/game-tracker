import firebase from "gatsby-plugin-firebase"
import { forDb } from "@utils"
import T from "@types"
import Cache from "./cache"

const Database = {
	getCollection: async function(collection) {
		if (!collection)
			throw Error(
				'Database.getCollection() is missing a required argument: collection="", item={}',
			)

		try {
			const items = []
			const collectionRef = await firebase
				.firestore()
				.collection(collection)
				.get()
			collectionRef.forEach((doc) => {
				items.push(doc.data())
			})
			return items
		} catch (err) {
			throw Error(`Error fetching ${collection} collection from Firebase`, err)
		}
	},

	addToCollection: async function(collection, item) {
		if (!collection || !item)
			throw Error(
				'Database.addToCollection() is missing one or more required arguments: collection="", item={}',
			)

		try {
			await firebase
				.firestore()
				.collection(collection)
				.add(item)

			await Cache.updateArrValue(collection, forDb(item))
		} catch (err) {
			throw new Error(
				`An error occurred adding item to ${collection} collection in Firebase`,
				err,
			)
		}
	},

	/**
	 * Fetch games - cache first, then Firebase
	 */
	fetchGames: async function() {
		const cachedGames = await Cache.loadFromCache(T.DB_KEY_GAMES)
		if (cachedGames) return cachedGames

		const firebaseGames = await this.getCollection(T.DB_KEY_GAMES)

		await Cache.set(T.DB_KEY_GAMES, firebaseGames)
		await Cache.setLastFetched(T.DB_KEY_GAMES)

		return firebaseGames
	},

	/**
	 * Fetch players - cache first, then Firebase
	 */
	fetchPlayers: async function() {
		const cachedPlayers = await Cache.loadFromCache(T.DB_KEY_PLAYERS)
		if (cachedPlayers) return cachedPlayers

		const firebasePlayers = await this.getCollection(T.DB_KEY_PLAYERS)

		await Cache.set(T.DB_KEY_PLAYERS, firebasePlayers)
		await Cache.setLastFetched(T.DB_KEY_PLAYERS)

		return firebasePlayers
	},

	/**
	 * Fetch players - cache first, then Firebase
	 * (Note: Currently unused, but will be used for viewing all-time data)
	 */
	fetchResults: async function() {
		const cachedResults = await Cache.loadFromCache(T.DB_KEY_RESULTS)
		if (cachedResults) {
			return cachedResults
		}

		const firebaseResults = await this.getCollection(T.DB_KEY_RESULTS)

		await Cache.set(T.DB_KEY_GAMES, firebaseResults)
		await Cache.setLastFetched(T.DB_KEY_GAMES)

		return firebaseResults
	},

	/**
	 * Save a game result to Firebase
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
	 * Save a new item to Firebase (game or player for now)
	 */
	saveNewItem: async function(dataKey, uid) {
		if (!dataKey || !uid)
			throw Error(
				`Database.saveNewItem() is missing one or more required arguments: dataKey="", uid=""`,
			)

		const item = { uid: forDb(uid) }

		try {
			await firebase
				.firestore()
				.collection(dataKey)
				.add(item)

			await Cache.updateArrValue(dataKey, item)
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
