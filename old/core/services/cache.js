import { get, set } from "idb-keyval"
import { isDev } from "@services/utilities"

const oneMinute = 1000 * 60
const oneHour = oneMinute * 60

class Cache {
	constructor(lifespan = oneHour, enabled = true) {
		/**
		 * The lifespan (in ms) of the cache.
		 * If time elapsed since `lastFetched` value is greater
		 * than `lifespan`, the cache is stale and data should
		 * be re-fetched from Firebase.
		 */
		this.lifespan = lifespan

		this.enabled = false
	}

	/**
	 * Set a value in IndexedDB
	 */
	async set(key, val) {
		try {
			await set(key, val)
		} catch (err) {
			throw Error(`Error occurred setting "${key}" data in IndexedDB`)
		}
	}

	/**
	 * Get a value from IndexedDB
	 */
	async get(key) {
		try {
			return await get(key)
		} catch (err) {
			throw Error(`Error occurred getting "${key}" data from IndexedDB`)
		}
	}

	/**
	 * Store the current time in the cache. Used to determine if the
	 * cache is stale.
	 */
	async setLastFetched() {
		const now = Date.now()
		await this.set("lastFetched", now)
	}

	// /**
	//  * Load data from cache. Returns the cached value for the
	//  * data key (games or players for now), or `false` if not found
	//  */
	// async loadFromCache(dataKey) {
	// 	const cachedItems = await this.get(dataKey)
	// 	if (cachedItems && cachedItems.length > 0) {
	// 		const cacheIsStale = await this.isStale()
	// 		if (!cacheIsStale) {
	// 			return cachedItems
	// 		}
	// 	}

	// 	return false
	// }

	/**
	 * Get items of specified item type from IndexedDB. If no items,
	 * or if cache is stale, return false; else return array of items.
	 * @param {string} itemType
	 */
	async getCachedItems(itemType) {
		// Check if there are cached items
		const cachedItems = await this.get(itemType)
		if (cachedItems && cachedItems.length > 0) {
			// If so, check if the cache is stale
			const cacheIsStale = await this.isStale()
			if (!cacheIsStale) {
				// If cache is not stale, return cached items
				console.log("Returning cached items", cachedItems)
				return cachedItems
			}
		}

		// Otherwise, return false to indicate a re-fetch is needed
		return false
	}

	/**
	 * Check if the cache is stale.
	 * @returns {boolean}
	 */
	async isStale() {
		try {
			// Check for a "last fetched" timestamp
			const lastFetched = await get("lastFetched")
			if (!lastFetched) return true

			// Calculate the time elapsed between now and the last fetch
			const now = Date.now()
			const elapsed = now - lastFetched

			// If time elapsed is greater than the cache's specified lifespan, it's stale
			const cacheIsStale = elapsed > this.lifespan
			if (cacheIsStale) return true

			// If not stale and in dev environment, console.log the time til expiration
			if (isDev()) {
				// Otherwise,
				const timeUntilStale = Math.floor((this.lifespan - elapsed) / 1000 / 60)
				console.log(`Cache expires in ${timeUntilStale} minutes.`)
			}

			return false
		} catch (err) {
			throw Error(`Error checking if the cache is stale`)
		}
	}

	/**
	 * Add an item to an array in IndexedDB
	 */
	async updateArrValue(key, value) {
		const cachedValues = await this.get(key)
		if (cachedValues) {
			const nextValues = [...cachedValues, value]
			await this.set(key, nextValues)
		}
	}
}

const C = new Cache(oneHour)

export default C
