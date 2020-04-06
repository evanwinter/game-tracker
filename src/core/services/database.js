import firebase from "gatsby-plugin-firebase"
import Cache from "@services/cache"
import Types from "@types"

const Database = {
	getCollection: async function(dataKey) {
		if (!dataKey)
			throw Error(
				'Database.getCollection() is missing a required argument: collection="", item={}',
			)

		try {
			const items = []
			const collectionRef = await firebase
				.firestore()
				.collection(dataKey)
				.get()
			collectionRef.forEach((doc) => {
				items.push(doc.data())
			})
			return items
		} catch (err) {
			throw Error(`Error fetching ${dataKey} collection from Firebase`, err)
		}
	},

	addToCollection: async function(dataKey, item) {
		if (!dataKey || !item)
			throw Error(
				'Database.addToCollection() is missing one or more required arguments: collection="", item={}',
			)

		try {
			await firebase
				.firestore()
				.collection(dataKey)
				.add(item)
		} catch (err) {
			console.log(err)
			throw new Error(
				`An error occurred adding item to ${dataKey} collection in Firebase`,
				err,
			)
		}
	},

	/**
	 * Fetch games - cache first, then Firebase
	 */
	fetchGames: async function() {
		const cachedGames = await Cache.loadFromCache(Types.DB_KEY_GAMES)
		if (cachedGames) return cachedGames

		const firebaseGames = await this.getCollection(Types.DB_KEY_GAMES)

		await Cache.set(Types.DB_KEY_GAMES, firebaseGames)
		await Cache.setLastFetched(Types.DB_KEY_GAMES)

		return firebaseGames
	},

	/**
	 * Fetch players - cache first, then Firebase
	 */
	fetchPlayers: async function() {
		const cachedPlayers = await Cache.loadFromCache(Types.DB_KEY_PLAYERS)
		if (cachedPlayers) return cachedPlayers

		const firebasePlayers = await this.getCollection(Types.DB_KEY_PLAYERS)

		await Cache.set(Types.DB_KEY_PLAYERS, firebasePlayers)
		await Cache.setLastFetched(Types.DB_KEY_PLAYERS)

		return firebasePlayers
	},

	/**
	 * Fetch players - cache first, then Firebase
	 * (Note: Currently unused, but will be used for viewing all-time data)
	 */
	fetchResults: async function() {
		const cachedResults = await Cache.loadFromCache(Types.DB_KEY_RESULTS)
		if (cachedResults) return cachedResults

		const firebaseResults = await this.getCollection(Types.DB_KEY_RESULTS)

		await Cache.set(Types.DB_KEY_GAMES, firebaseResults)
		await Cache.setLastFetched(Types.DB_KEY_GAMES)

		return firebaseResults
	},

	/**
	 * Save a game result to Firebase
	 */
	saveGameResult: async function(result) {
		if (
			!result ||
			!result.game ||
			!result.players.length > 0 ||
			!result.winner ||
			!result.time
		)
			return

		// add to firebase
		await this.addToCollection(Types.DB_KEY_RESULTS, result)
	},

	/**
	 * Save a new item to Firebase (game or player for now)
	 */
	saveNewItem: async function(dataKey, uid) {
		if (!dataKey || !uid)
			throw Error(
				`Database.saveNewItem() is missing one or more required arguments: dataKey="", uid=""`,
			)

		const item = {
			uid: uid.toLowerCase(),
		}

		// add to firebase
		await this.addToCollection(dataKey, item)
		// and mirror in redux session data
		await Cache.updateArrValue(dataKey, item)
	},
}

export default Database
