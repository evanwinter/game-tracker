import Types from "@types"

const removeUid = (items, uid) => items.filter((item) => item.uid !== uid)

const initialState = {
	general: {
		step: Types.STEP_INITIAL,
	},

	modal: {
		show: false,
		content: {
			headline: "",
			body: "",
		},
	},

	session: {
		game: "",
		players: [],
		winner: "",
	},

	database: {
		games: [],
		players: [],
	},
}

const reducer = (state = initialState, action) => {
	if (action.type === Types.SET_ITEM) {
		return {
			...state,
			session: {
				...state.session,
				[action.destKey]: action.item,
			},
		}
	}

	if (action.type === Types.SELECT_ITEM) {
		return {
			...state,
			session: {
				...state.session,
				[action.destKey]: [...state.session[action.destKey], action.item],
			},
		}
	}

	if (action.type === Types.DESELECT_ITEM) {
		return {
			...state,
			session: {
				...state.session,
				[action.destKey]: removeUid(
					state.session[action.destKey],
					action.item.uid,
				),
			},
		}
	}

	if (action.type === Types.SET_STEP) {
		return {
			...state,
			general: {
				...state.general,
				step: action.nextStep,
			},
		}
	}

	if (action.type === Types.NEXT_STEP) {
		return {
			...state,
			general: {
				...state.general,
				step: Types.getNextStep(state.general.step),
			},
		}
	}

	if (action.type === Types.PREV_STEP) {
		return {
			...state,
			general: {
				...state.general,
				step: Types.getPrevStep(state.general.step),
			},
		}
	}

	if (action.type === Types.LOAD_COLLECTION) {
		return {
			...state,
			database: {
				...state.database,
				[action.dataKey]: action.items,
			},
		}
	}

	if (action.type === Types.SAVE_NEW_ITEM) {
		return {
			...state,
			database: {
				...state.database,
				[action.dataKey]: [...state.database[action.dataKey], action.value],
			},
		}
	}

	if (action.type === Types.SHOW_MODAL) {
		return {
			...state,
			modal: {
				show: true,
				content: {
					headline: action.headline,
					body: action.body,
				},
			},
		}
	}

	if (action.type === Types.CLOSE_MODAL) {
		return {
			...state,
			modal: {
				...state.modal,
				show: false,
			},
		}
	}

	if (action.type === Types.RESTART) {
		return {
			...initialState,
			modal: {
				...state.modal,
			},
		}
	}

	return state
}

export default reducer
