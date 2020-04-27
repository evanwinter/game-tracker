import Firestore from "@services/firestore"
import Cache from "@services/cache"

const Database = {
  async getItems(storeKey) {
    // (1) Check IndexedDB cache for cached items and return if found
    const cachedItems = await Cache.getCachedItems(storeKey)
    if (cachedItems) return cachedItems

    // (2) Else fetch items from Firestore and return if found
    const databaseItems = await Firestore.getCollection(storeKey)
    if (databaseItems) {
      await Cache.set(storeKey, databaseItems)
      await Cache.setFetchTimestamp()
      return databaseItems
    }
  },
}

export default Database
