import T from "@types"

const AppActions = {
  setStep: (step) => ({
    type: T.SET_STEP,
    step: step,
  }),

  nextStep: () => ({
    type: T.NEXT_STEP,
  }),

  prevStep: () => ({
    type: T.PREV_STEP,
  }),

  restart: () => ({
    type: T.RESTART,
  }),
}

const SessionActions = {
  // setItem: (itemType, uid) => ({
  //   type: T.SET_ITEM,
  //   item: { uid: uid },
  //   itemType: itemType,
  // }),
  // selectItem: (itemType, uid, isSelected) => {
  //   const type =
  //     JSON.parse(isSelected) === true ? T.DESELECT_ITEM : T.SELECT_ITEM
  //   return {
  //     type: type,
  //     item: { uid: uid },
  //     itemType: itemType,
  //   }
  // },
}

const ModalActions = {
  showModal: (headline, body) => ({
    type: T.SHOW_MODAL,
    headline: headline,
    body: body,
  }),

  closeModal: () => ({
    type: T.CLOSE_MODAL,
  }),
}

/**
 * Firebase actions; these are asynchronous actions that wait for data from
 * the network (Firebase) before firing
 */
const FirebaseActions = {
  // /**
  //  * Save an "item" (player or game) to the database.
  //  */
  // saveNewItem: (dataKey, value) => async (dispatch, _getState, database) => {
  //   const success = await database.saveNewItem(dataKey, value)
  //   if (!success) return false
  //   dispatch({
  //     type: T.SAVE_NEW_ITEM,
  //     dataKey: dataKey,
  //     value: { uid: value },
  //   })
  //   return true
  // },
  // /**
  //  * Save a game result to the database.
  //  */
  // saveGameResult: (result) => async (_dispatch, _getState, database) => {
  //   return await database.saveGameResult(result)
  // },
  // /**
  //  * Load items from cache/Firestore into Redux
  //  */
  // loadItems: (itemType) => async (dispatch, _getState, database) => {
  //   console.log("Fetching items and loading them into redux")
  //   const items = await database.getItems(itemType)
  //   if (!items || items.length === 0) return false
  //   dispatch({
  //     type: T.LOAD_ITEMS,
  //     itemType: itemType,
  //     items: items,
  //   })
  // },
}

const Actions = {
  ...AppActions,
  ...FirebaseActions,
  ...ModalActions,
  ...SessionActions,
}

export default Actions
