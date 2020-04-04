import { get, set } from "idb-keyval"

const toMinutes = (ms) => Math.round(Math.floor(ms / 1000 / 60))
const oneMinute = 1000 * 60
const oneHour = oneMinute * 60
// const oneDay = oneHour * 24
// const thirtySeconds = oneMinute / 2

const Cache = {
	lifespan: oneHour,

	store: async function(key, val) {
		try {
			await set(key, val)
		} catch (err) {
			throw new Error(`Error occurred setting data to key: ${key} in IndexedDB`)
		}
	},

	retrieve: async function(key) {
		try {
			// Check if the cached value is stale (set over 30 seconds ago for now)
			const lastFetched = await get(`lastFetched`)
			if (lastFetched) {
				const now = Date.now()
				const timeElapsed = now - lastFetched
				if (timeElapsed > this.lifespan) {
					// console.info("Cache is stale, re-fetching data")
					return false
				} else {
					// console.log(
					// 	"Time until cache invalidation: " +
					// 		toMinutes(this.lifespan - timeElapsed) +
					// 		" minutes",
					// )
				}
			}

			return await get(key)
		} catch (err) {
			throw new Error(
				`Error occurred retrieving IndexedDB data for key: ${key}`,
			)
		}
	},

	setLastFetched: async function(key) {
		try {
			await set(`lastFetched`, Date.now())
		} catch (err) {
			throw new Error(`Error setting lastFetched for ${key}`)
		}
	},

	appendCacheValue: async function(key, value) {
		const cachedValues = await this.retrieve(key)
		if (cachedValues) {
			await this.store(key, [...cachedValues, value])
		}
	},
}

export default Cache
