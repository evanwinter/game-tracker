import T from "@types"

const ModalActions = {
	closeModal: () => ({
		type: T.CLOSE_MODAL,
	}),

	showModal: (headline, body) => ({
		type: T.SHOW_MODAL,
		headline: headline,
		body: body,
	}),
}

const FirebaseActions = {
	saveNewItem(dataKey, value) {
		return async (dispatch, getState, database) => {
			await database.saveNewItem(dataKey, value)
			dispatch({
				type: T.SAVE_NEW_ITEM,
				dataKey: dataKey,
				value: value,
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
			if (!games || games.length < 1) return

			dispatch({
				type: T.LOAD_GAMES,
				games: games,
			})
		}
	},

	loadPlayers() {
		return async (dispatch, getState, database) => {
			const players = await database.fetchPlayers()
			if (!players || players.length < 1) return

			dispatch({
				type: T.LOAD_PLAYERS,
				players: players,
			})
		}
	},
}

const AppActions = {
	nextStep: (nextStep) => ({
		type: T.SET_STEP,
		nextStep: nextStep,
	}),

	prevStep: (prevStep) => ({
		type: T.SET_STEP,
		nextStep: prevStep,
	}),

	restart: () => ({
		type: T.RESTART,
	}),
}

const SessionActions = {
	setGame: (game) => ({
		type: T.SET_GAME,
		game: { uid: game },
		nextStep: T.STEP_CHOOSING_PLAYERS,
	}),

	setPlayers: (players) => ({
		type: T.SET_PLAYERS,
		players: players,
		nextStep: T.STEP_CHOOSING_WINNER,
	}),

	setWinner: (winner) => ({
		type: T.SET_WINNER,
		winner: { uid: winner },
		nextStep: T.STEP_REVIEWING_SUBMISSION,
	}),

	selectPlayer: (player, isSelected) => ({
		type: JSON.parse(isSelected) === true ? T.REMOVE_PLAYER : T.ADD_PLAYER,
		player: { uid: player },
	}),
}

const Actions = {
	...ModalActions,
	...FirebaseActions,
	...AppActions,
	...SessionActions,
}

export default Actions
