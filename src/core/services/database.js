import Firestore from "@services/firestore"

const Database = {
  async getItems(storeKey) {
    // (1) Check IndexedDB cache for cached items. Return early if found.
    // const cachedItems = await Cache.getCachedItems(storePath)
    // if (cachedItems) return cachedItems

    // (2) Otherwise, fetch items from Firestore.
    const databaseItems = await Firestore.getCollection(storeKey)
    if (databaseItems) {
      // await Cache.set(storeKey, databaseItems)
      // await Cache.setLastFetched()
      return databaseItems
    }
  },
}

export default Database
