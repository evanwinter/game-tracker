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

	database: {
		games: [],
		players: [],
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

	if (action.type === T.LOAD_GAMES) {
		return {
			...state,
			database: {
				...state.database,
				games: action.games,
			},
		}
	}

	if (action.type === T.LOAD_PLAYERS) {
		return {
			...state,
			database: {
				...state.database,
				players: action.players,
			},
		}
	}

	if (action.type === T.SAVE_NEW_GAME) {
		return {
			...state,
			database: {
				...state.database,
				games: [...state.database.games, action.game],
			},
		}
	}

	if (action.type === T.SAVE_NEW_PLAYER) {
		return {
			...state,
			database: {
				...state.database,
				players: [...state.database.players, action.player],
			},
		}
	}

	if (action.type === T.RESTART) {
		return initialState
	}

	return state
}

export default reducer
