function Types() {
	this.RESTART = "RESTART"
	this.SET_STEP = "SET_STEP"
	this.NEXT_STEP = "NEXT_STEP"
	this.PREV_STEP = "PREV_STEP"

	// App "steps" which determine the main content
	this.STEP_CHOOSING_GAME = "CHOOSING_GAME"
	this.STEP_CHOOSING_PLAYERS = "CHOOSING_PLAYERS"
	this.STEP_CHOOSING_WINNER = "CHOOSING_WINNER"
	this.STEP_REVIEWING_SUBMISSION = "REVIEWING_SUBMISSION"
	this.STEP_SUBMITTED = "SUBMITTED"

	this.STEP_INITIAL = this.STEP_CHOOSING_GAME

	// Session data setters
	this.SET_GAME = "SET_GAME"
	this.SET_PLAYERS = "SET_PLAYERS"
	this.SET_WINNER = "SET_WINNER"
	this.ADD_PLAYER = "ADD_PLAYER"
	this.REMOVE_PLAYER = "REMOVE_PLAYER"

	this.SELECT_ITEM = "SELECT_ITEM"
	this.DESELECT_ITEM = "DESELECT_ITEM"
	this.SET_ITEM = "SET_ITEM"

	// Firebase getters and setters
	this.LOAD_GAMES = "LOAD_GAMES"
	this.LOAD_PLAYERS = "LOAD_PLAYERS"
	this.LOAD_RESULTS = "LOAD_RESULTS"
	this.LOAD_COLLECTION = "LOAD_COLLECTION"
	this.SAVE_NEW_GAME = "SAVE_NEW_GAME"
	this.SAVE_NEW_PLAYER = "SAVE_NEW_PLAYER"
	this.SAVE_NEW_GAME_RESULT = "SAVE_NEW_GAME_RESULT"
	this.SAVE_NEW_ITEM = "SAVE_NEW_ITEM"

	// Modal
	this.CLOSE_MODAL = "CLOSE_MODAL"
	this.SHOW_MODAL = "SHOW_MODAL"

	// Keys for Firebase and IndexedDB collections
	this.DB_KEY_GAMES = "games"
	this.DB_KEY_PLAYERS = "players"
	this.DB_KEY_RESULTS = "results"
	this.DB_KEY_LAST_FETCHED = "lastFetched"

	// Order in which to display steps
	this.STEPS_ORDERED = [
		this.STEP_CHOOSING_GAME,
		this.STEP_CHOOSING_PLAYERS,
		this.STEP_CHOOSING_WINNER,
		this.STEP_REVIEWING_SUBMISSION,
	]

	this.STEPS_WITH_ADD = {
		[this.STEP_CHOOSING_GAME]: this.DB_KEY_GAMES,
		[this.STEP_CHOOSING_PLAYERS]: this.DB_KEY_PLAYERS,
	}

	this.getNextStep = function(step) {
		const index = this.STEPS_ORDERED.indexOf(step)
		const nextIndex = index + 1
		const outOfBounds = nextIndex >= this.STEPS_ORDERED.length
		if (!outOfBounds) {
			return this.STEPS_ORDERED[nextIndex]
		} else {
			return step
		}
	}

	this.getPrevStep = function(step) {
		const index = this.STEPS_ORDERED.indexOf(step)
		const nextIndex = index - 1
		const outOfBounds = nextIndex < 0
		if (!outOfBounds) {
			return this.STEPS_ORDERED[nextIndex]
		} else {
			return step
		}
	}
}

const T = new Types()

export default T
