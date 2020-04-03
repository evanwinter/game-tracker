import { get, set } from "idb-keyval"

const Cache = {
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
			const lastFetched = await get(`${key}__lastFetched`)
			if (lastFetched) {
				const now = Date.now()
				const oneMinute = 1000 * 60
				const oneHour = oneMinute * 60
				const oneDay = oneHour * 24
				const thirtySeconds = oneMinute / 2
				const timeElapsed = now - lastFetched
				if (timeElapsed > oneHour) {
					console.info("Cache is stale, re-fetching data")
					return false
				} else {
					console.log(
						"Time until cache invalidation: " +
							Math.round(Math.floor((oneHour - timeElapsed) / 1000 / 60)) +
							" minutes",
					)
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
			await set(`${key}__lastFetched`, Date.now())
		} catch (err) {
			throw new Error(`Error setting lastFetched for ${key}`)
		}
	},
}

export default Cache
