import { get, set } from "idb-keyval"

const oneMinute = 1000 * 60
const oneHour = oneMinute * 60

const Cache = {
	/**
	 * The lifespan (in ms) of the cache.
	 * If time elapsed since `lastFetched` value is greater
	 * than `lifespan`, the cache is stale and data should
	 * be re-fetched from Firebase.
	 */
	lifespan: oneHour,

	/**
	 * Set a value in IndexedDB
	 */
	async set(key, val) {
		try {
			await set(key, val)
		} catch (err) {
			throw Error(`Error occurred setting "${key}" data in IndexedDB`)
		}
	},

	/**
	 * Get a value from IndexedDB
	 */
	async get(key) {
		try {
			return await get(key)
		} catch (err) {
			throw Error(`Error occurred getting "${key}" data from IndexedDB`)
		}
	},

	/**
	 * Store the current time in the cache. Used to determine if the
	 * cache is stale.
	 */
	async setLastFetched() {
		const now = Date.now()
		await this.set("lastFetched", now)
	},

	/**
	 * Load data from cache. Returns the cached value for the
	 * data key (games or players for now), or `false` if not found
	 */
	async loadFromCache(dataKey) {
		const cachedItems = await this.get(dataKey)
		if (cachedItems && cachedItems.length > 0) {
			const cacheIsStale = await this.isStale()
			if (!cacheIsStale) {
				return cachedItems
			}
		}

		return false
	},

	/**
	 * Return a boolean representing whether or not the cache is stale.
	 * Compare `lastFetched` in IndexedDB to the current time; return true
	 * if the difference is greater than `this.lifespan`
	 */
	async isStale() {
		try {
			const lastFetched = await get("lastFetched")
			if (!lastFetched) return true

			const timeNow = Date.now()
			const timeElapsed = timeNow - lastFetched
			const cacheIsStale = timeElapsed > this.lifespan

			return cacheIsStale
		} catch (err) {
			throw Error(`Error checking if the cache is stale`)
		}
	},

	/**
	 * Add an item to an array in IndexedDB
	 */
	async updateArrValue(key, value) {
		const cachedValues = await this.get(key)
		if (cachedValues) {
			const nextValues = [...cachedValues, value]
			await this.set(key, nextValues)
		}
	},
}

export default Cache
