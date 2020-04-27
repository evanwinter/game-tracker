import { get, set } from "idb-keyval"

const oneSecond = 1000
const oneMinute = oneSecond * 60
const oneHour = oneMinute * 60
const oneDay = oneHour * 24

const KEYS = { lastFetched: "lastFetched" }

const Cache = {
  lifespan: oneHour,

  async set(key, val) {
    try {
      await set(key, val)
    } catch (error) {
      throw Error(error)
    }
  },

  async get(key) {
    try {
      return await get(key)
    } catch (error) {
      throw Error(error)
    }
  },

  async setFetchTimestamp() {
    const currentTime = Date.now()
    await this.set(KEYS.lastFetched, currentTime)
  },

  async getCachedItems(itemType) {
    const items = await get(itemType)
    if (items && items.length > 0) {
      const stale = await this.isStale()
      if (!stale) {
        return items
      }
    }

    return false
  },

  async isStale() {
    try {
      const lastFetched = await get(KEYS.lastFetched)

      // if there's no timestamp, treat it as stale and re-fetch data
      if (!lastFetched) {
        return true
      }

      // calculate the time elapsed between now and the timestamp
      const now = Date.now()
      const elapsed = now - lastFetched

      // check if time elapsed > cache lifespan
      // if true, cache is stale and data should be re-fetched
      const stale = elapsed > this.lifespan
      if (stale) {
        console.log(`Cache is stale.`)
        return true
      }

      const timeLeft = this.getTimeToExpireation(elapsed, this.lifespan)
      console.log(`Cache expires in ${timeLeft.minutes} minutes.`)
      return false
    } catch (error) {
      throw Error(error)
    }
  },

  getTimeToExpireation(elapsed, lifespan) {
    if (elapsed <= 0) return {}

    const timeLeftObj = {
      ms: 0,
      minutes: 0,
    }

    timeLeftObj.ms = lifespan - elapsed
    timeLeftObj.minutes = Math.floor(timeLeftObj.ms / 1000 / 60)

    return timeLeftObj
  },

  // async push(key, value) {
  //   const values = await this.get(key)
  //   if (values) {
  //     const nextValues = [...values, value]
  //     await this.set(key, nextValues)
  //   }
  // },
}

export default Cache
