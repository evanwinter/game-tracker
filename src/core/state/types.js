function Types() {
	this.RESTART = "RESTART"
	this.SET_STEP = "SET_STEP"

	// App "steps" which determine the main content
	this.STEP_INITIAL = "INITIAL"
	this.STEP_CHOOSING_GAME = "CHOOSING_GAME"
	this.STEP_CHOOSING_PLAYERS = "CHOOSING_PLAYERS"
	this.STEP_CHOOSING_WINNER = "CHOOSING_WINNER"
	this.STEP_REVIEWING_SUBMISSION = "REVIEWING_SUBMISSION"
	this.STEP_SUBMITTED = "SUBMITTED"

	// Session data setters
	this.SET_GAME = "SET_GAME"
	this.SET_PLAYERS = "SET_PLAYERS"
	this.SET_WINNER = "SET_WINNER"

	// Firebase getters and setters
	this.LOAD_GAMES = "LOAD_GAMES"
	this.LOAD_PLAYERS = "LOAD_PLAYERS"
	this.SAVE_NEW_GAME = "SAVE_NEW_GAME"
	this.SAVE_NEW_PLAYER = "SAVE_NEW_PLAYER"
	this.SAVE_NEW_GAME_RESULT = "SAVE_NEW_GAME_RESULT"

	// Order in which to display steps
	this.STEPS_ORDERED = [
		this.STEP_CHOOSING_GAME,
		this.STEP_CHOOSING_PLAYERS,
		this.STEP_CHOOSING_WINNER,
		this.STEP_REVIEWING_SUBMISSION,
	]
}

const T = new Types()

export default T
