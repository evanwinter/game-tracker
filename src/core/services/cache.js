import { get, set } from "idb-keyval"
import Logger from "@services/logger"

const oneMinute = 1000 * 60
const oneHour = oneMinute * 60

const Cache = {
	lifespan: oneHour,

	set: async function(key, val) {
		try {
			await set(key, val)
		} catch (err) {
			throw Error(`Error occurred setting data to key: ${key} in IndexedDB`)
		}
	},

	get: async function(key) {
		try {
			return await get(key)
		} catch (err) {
			throw Error(`Error occurred retrieving IndexedDB data for key: ${key}`)
		}
	},

	setLastFetched: async function() {
		try {
			const timeNow = Date.now()
			await set(`lastFetched`, timeNow)
		} catch (err) {
			throw Error(`Error setting lastFetched`)
		}
	},

	/**
	 * Load data from cache. Returns the cached value for the
	 * data key (games or players for now), or `false` if not found
	 */
	loadFromCache: async function(dataKey) {
		const cachedItems = await this.get(dataKey)
		if (cachedItems && cachedItems.length > 0) {
			Logger.log(`Cached ${dataKey} found...`)
			const cacheIsStale = await this.isStale()
			if (!cacheIsStale) {
				Logger.log(`Loading cached ${dataKey} into app...`)
				return cachedItems
			}

			Logger.log(`Cache is stale.`)
		}

		Logger.log(`No cached ${dataKey} found.`)
		Logger.log(`Re-fetching data from the network.`)

		return false
	},

	/**
	 * Return a boolean representing whether or not the cache is stale.
	 * Compare `lastFetched` in IndexedDB to the current time; return true
	 * if the difference is greater than `this.lifespan`
	 */
	isStale: async function() {
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
	updateArrValue: async function(key, value) {
		console.log("Getting IDB values...")
		const cachedValues = await this.get(key)
		if (cachedValues) {
			Logger.log("Setting IDB values...", value)
			const nextValues = [...cachedValues, value]
			Logger.log("Next values...", nextValues)
			await this.set(key, nextValues)
			Logger.log("IDB updated with new value.")
		}
	},
}

export default Cache
