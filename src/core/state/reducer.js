import T from "@types"

const initialState = {
	general: {
		step: T.STEP_CHOOSING_GAME,
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
}

const reducer = (state = initialState, action) => {
	if (action.type === T.SET_GAME) {
		return {
			...state,
			session: {
				...state.session,
				game: action.game,
			},
		}
	}

	if (action.type === T.SET_PLAYERS) {
		return {
			...state,
			session: {
				...state.session,
				players: action.players,
			},
		}
	}

	if (action.type === T.SET_WINNER) {
		return {
			...state,
			session: {
				...state.session,
				winner: action.winner,
			},
		}
	}

	if (action.type === T.SET_STEP) {
		return {
			...state,
			general: {
				...state.general,
				step: action.step,
			},
		}
	}

	return state
}

export default reducer
