import firebase from "gatsby-plugin-firebase"
import Cache from "@services/cache"
import { isLoggedIn } from "@services/authentication"
import Types from "@types"

const validResult = (result) => {
	const { game, players, winner, time } = result
	return game && players && winner && time
}

const Database = {
	/**
	 * Get a collection from Firebase
	 */
	async getFirebaseCollection(collection) {

		console.log('Calling getFirebaseCollection')

		if (!collection)
			throw Error(
				'Database.getCollection() is missing a required argument: collection=""',
			)

		if (!isLoggedIn()) {
			return false
		}

		try {
			const items = []
			console.log('Trying to get '+ collection + ' collection')
			const itemsRef = await firebase
				.firestore()
				.collection(collection)
				.get()

			itemsRef.forEach((doc) => doc.data() && items.push(doc.data()))

			return items
		} catch (err) {
			throw Error(`Error fetching ${collection} collection from Firebase`, err)
		}
	},

	/**
	 * Add a document to a Firebase collection
	 */
	async addToFirebaseCollection(collection, item) {
		if (!collection || !item)
			throw Error(
				'Database.addToCollection() is missing one or more required arguments: collection="", item={}',
			)

		if (!isLoggedIn()) {
			return false
		}

		try {
			await firebase
				.firestore()
				.collection(collection)
				.add(item)

			return true
		} catch (err) {
			throw new Error(
				`An error occurred adding item to ${collection} collection in Firebase`,
				err,
			)
		}
	},

	/**
	 * Fetch a collection of documents form the database
	 *
	 */
	async fetchCollection(dataKey) {
		const cachedItems = await Cache.loadFromCache(dataKey)
		if (cachedItems) return cachedItems

		const databaseItems = await this.getFirebaseCollection(dataKey)
		if (databaseItems) {
			await Cache.set(dataKey, databaseItems)
			await Cache.setLastFetched(dataKey)
			return databaseItems
		}

		return false
	},

	/**
	 * Save a new game result in the database
	 */
	async saveGameResult(result) {
		if (!validResult(result)) return false

		return await this.addToFirebaseCollection(Types.DB_KEY_RESULTS, result)
	},

	/**
	 * Save a new "item" (game or player) in the database
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
		await this.addToFirebaseCollection(dataKey, item)
		// and mirror in redux session data
		await Cache.updateArrValue(dataKey, item)

		return true
	},
}

export default Database
