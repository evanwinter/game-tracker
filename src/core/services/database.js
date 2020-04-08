import firebase from "gatsby-plugin-firebase"
import Cache from "@services/cache"
import { isLoggedIn } from "@services/authentication"
import Types from "@types"

const Database = {
	async getCollection(dataKey) {
		if (!dataKey)
			throw Error(
				'Database.getCollection() is missing a required argument: collection="", item={}',
			)

		if (!isLoggedIn()) {
			return false
		}

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

	async addToCollection(dataKey, item) {
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
			throw new Error(
				`An error occurred adding item to ${dataKey} collection in Firebase`,
				err,
			)
		}
	},

	/**
	 * Fetch collection - cache first, then Firebase
	 */
	async fetchCollection(dataKey) {
		const cachedItems = await Cache.loadFromCache(dataKey)
		if (cachedItems) return cachedItems

		const firebaseItems = await this.getCollection(dataKey)
		if (!firebaseItems) return []

		await Cache.set(dataKey, firebaseItems)
		await Cache.setLastFetched(dataKey)

		return firebaseItems
	},

	/**
	 * Save a game result to Firebase
	 */
	async saveGameResult(result) {
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
	async saveNewItem(dataKey, uid) {
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
