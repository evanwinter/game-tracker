import firebase from "gatsby-plugin-firebase"
import Cache from "@services/cache"
import { isLoggedIn } from "@services/authentication"
import Types from "@types"

const validResult = result => {
	const { game, players, winner, time } = result
	return game && players && winner && time
}

const Firestore = {
	/**
	 * Get a collection from Firestore
	 */
	async getCollection(collection) {
		console.log("Calling Firestore.getCollection")

		if (!collection)
			throw Error(
				'Firestore.getCollection() is missing a required argument: collection=""'
			)

		if (!isLoggedIn()) {
			return false
		}

		try {
			const items = []
			console.log("Trying to get " + collection + " collection")
			const itemsRef = await firebase
				.firestore()
				.collection(collection)
				.get()

			itemsRef.forEach(doc => doc.data() && items.push(doc.data()))

			return items
		} catch (err) {
			throw Error(`Error fetching ${collection} collection from Firestore`, err)
		}
	},

	/**
	 * Add a document to a Firestore collection
	 */
	async addToCollection(collection, item) {
		if (!collection || !item)
			throw Error(
				'Firestore.addToCollection() is missing one or more required arguments: collection="", item={}'
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
				`An error occurred adding item to ${collection} collection in Firestore`,
				err
			)
		}
	}
}

const Database = {
	async getItems(itemType) {
		// Return cached items if found
		const cachedItems = await Cache.getCachedItems(itemType)
		if (cachedItems) return cachedItems

		// Otherwise, fetch items from the database
		const databaseItems = await Firestore.getCollection(itemType)
		if (databaseItems) {
			// Update cache and return database items if found
			await Cache.set(itemType, databaseItems)
			await Cache.setLastFetched(itemType)
			return databaseItems
		}

		console.log(
			"Failed to get cached or database items, returning an empty array"
		)
		return []
	},

	/**
	 * Add a new game result in the database
	 */
	async saveGameResult(result) {
		if (!validResult(result)) return false

		return await Firestore.addToCollection(Types.DB_KEY_RESULTS, result)
	},

	/**
	 * Save a new "item" (game or player) in the database
	 */
	async saveNewItem(dataKey, uid) {
		if (!dataKey || !uid)
			throw Error(
				`Database.saveNewItem() is missing one or more required arguments: dataKey="", uid=""`
			)

		const item = {
			uid: uid.toLowerCase()
		}

		// add to firebase
		await Firestore.addToCollection(dataKey, item)
		// and mirror in redux session data
		await Cache.updateArrValue(dataKey, item)

		return true
	}
}

export default Database
