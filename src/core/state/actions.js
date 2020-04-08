import Types from "@types"

/**
 * Global app state
 */
const AppActions = {
	setStep: (step) => ({
		type: Types.SET_STEP,
		step: step,
	}),

	nextStep: () => ({
		type: Types.NEXT_STEP,
	}),

	prevStep: () => ({
		type: Types.PREV_STEP,
	}),

	restart: () => ({
		type: Types.RESTART,
	}),
}

/**
 * Session state; the values selected for the current submission
 */
const SessionActions = {
	setItem: (destKey, uid) => ({
		type: Types.SET_ITEM,
		item: { uid: uid },
		destKey: destKey,
	}),

	selectItem: (destKey, uid, isSelected) => {
		const type =
			JSON.parse(isSelected) === true ? Types.DESELECT_ITEM : Types.SELECT_ITEM
		return {
			type: type,
			item: { uid: uid },
			destKey: destKey,
		}
	},
}

/**
 * Modal state
 */
const ModalActions = {
	closeModal: () => ({
		type: Types.CLOSE_MODAL,
	}),

	showModal: (headline, body) => ({
		type: Types.SHOW_MODAL,
		headline: headline,
		body: body,
	}),
}

/**
 * Firebase actions; these are asynchronous actions that wait for data from
 * the network (Firebase) before firing
 */
const FirebaseActions = {
	saveNewItem: (dataKey, value) => async (dispatch, getState, database) => {
		const state = getState()
		const items = state.database[dataKey]
		if (items.map((item) => item.uid).includes(value)) {
			return null
		}

		await database.saveNewItem(dataKey, value)

		dispatch({
			type: Types.SAVE_NEW_ITEM,
			dataKey: dataKey,
			value: { uid: value },
		})
	},

	saveGameResult: (result) => async (_dispatch, _getState, database) => {
		await database.saveGameResult(result)
	},

	loadCollection: (dataKey) => async (dispatch, _getState, database) => {
		const items = await database.fetchCollection(dataKey)
		if (!items || items.length < 1) return null

		dispatch({
			type: Types.LOAD_COLLECTION,
			dataKey: dataKey,
			items: items,
		})
	},
}

const Actions = {
	...AppActions,
	...SessionActions,
	...ModalActions,
	...FirebaseActions,
}

export default Actions
