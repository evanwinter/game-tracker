import firebase from "gatsby-plugin-firebase"
import { isLoggedIn } from "@services/authentication"

const Firestore = {
  async getCollection(collection) {
    console.log(`Fetching ${collection} collection from Firestore.`)

    try {
      const collectionItems = []
      const collectionRef = await firebase
        .firestore()
        .collection(collection)
        .get()
      collectionRef.forEach((doc) => collectionItems.push(doc.data()))
      return collectionItems
    } catch (err) {
      throw Error(err)
    }
  },

  // (TODO)
  async addToCollection(item) {},
}

export default Firestore
