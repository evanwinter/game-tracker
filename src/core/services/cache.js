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
			return await get(key)
		} catch (err) {
			throw new Error(
				`Error occurred retrieving IndexedDB data for key: ${key}`,
			)
		}
	},
}

export default Cache
