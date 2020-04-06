import Types from "@types"

/**
 * Global app state
 */
const AppActions = {
	nextStep: (nextStep) => ({
		type: Types.SET_STEP,
		nextStep: nextStep,
	}),

	prevStep: (prevStep) => ({
		type: Types.SET_STEP,
		nextStep: prevStep,
	}),

	restart: () => ({
		type: Types.RESTART,
	}),
}

/**
 * Session state; the values selected for the current submission
 */
const SessionActions = {
	setGame: (game) => ({
		type: Types.SET_GAME,
		game: { uid: game },
		nextStep: Types.STEP_CHOOSING_PLAYERS,
	}),

	setPlayers: (players) => ({
		type: Types.SET_PLAYERS,
		players: players,
		nextStep: Types.STEP_CHOOSING_WINNER,
	}),

	setWinner: (winner) => ({
		type: Types.SET_WINNER,
		winner: { uid: winner },
		nextStep: Types.STEP_REVIEWING_SUBMISSION,
	}),

	selectPlayer: (player, isSelected) => ({
		type:
			JSON.parse(isSelected) === true ? Types.REMOVE_PLAYER : Types.ADD_PLAYER,
		player: { uid: player },
	}),
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
	saveNewItem(dataKey, value) {
		return async (dispatch, getState, database) => {
			await database.saveNewItem(dataKey, value)
			dispatch({
				type: Types.SAVE_NEW_ITEM,
				dataKey: dataKey,
				value: { uid: value },
			})
		}
	},

	saveGameResult(result) {
		return async (dispatch, getState, database) => {
			await database.saveGameResult(result)
		}
	},

	loadGames() {
		return async (dispatch, getState, database) => {
			const games = await database.fetchGames()

			if (games && games.length > 0) {
				dispatch({
					type: Types.LOAD_GAMES,
					games: games,
				})
			} else {
				// (TODO) Display "No games found" in the UI
			}
		}
	},

	loadPlayers() {
		return async (dispatch, getState, database) => {
			const players = await database.fetchPlayers()
			if (!players || players.length < 1) return

			dispatch({
				type: Types.LOAD_PLAYERS,
				players: players,
			})
		}
	},
}

const Actions = {
	...AppActions,
	...SessionActions,
	...ModalActions,
	...FirebaseActions,
}

export default Actions
