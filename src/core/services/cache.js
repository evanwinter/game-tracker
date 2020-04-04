import { get, set } from "idb-keyval"

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

	appendCacheValue: async function(key, value) {
		const cachedValues = await this.get(key)
		if (cachedValues) {
			await this.set(key, [...cachedValues, value])
		}
	},
}

export default Cache
