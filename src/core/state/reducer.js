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
			general: {
				...state.general,
				step: action.nextStep,
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
			general: {
				...state.general,
				step: action.nextStep,
			},
		}
	}

	if (action.type === T.ADD_PLAYER) {
		return {
			...state,
			session: {
				...state.session,
				players: [...state.session.players, action.player],
			},
		}
	}

	if (action.type === T.REMOVE_PLAYER) {
		return {
			...state,
			session: {
				...state.session,
				players: state.session.players.filter(
					(player) => player.uid !== action.player.uid,
				),
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
			general: {
				...state.general,
				step: action.nextStep,
			},
		}
	}

	if (action.type === T.SET_STEP) {
		return {
			...state,
			general: {
				...state.general,
				step: action.nextStep,
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

	if (action.type === T.SAVE_NEW_ITEM) {
		return {
			...state,
			database: {
				...state.database,
				[action.dataKey]: [...state.database[action.dataKey], action.value],
			},
		}
	}

	if (action.type === T.CLOSE_MODAL) {
		return {
			...state,
			modal: {
				...state.modal,
				show: false,
			},
		}
	}

	if (action.type === T.SHOW_MODAL) {
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

	if (action.type === T.RESTART) {
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
