function Types() {
  // this.RESTART = "RESTART"

  // this.SET_STEP = "SET_STEP"
  this.NEXT_STEP = "NEXT_STEP"
  this.PREV_STEP = "PREV_STEP"

  this.STEP_CHOOSING_GAME = "CHOOSING_GAME"
  this.STEP_CHOOSING_PLAYERS = "CHOOSING_PLAYERS"
  this.STEP_CHOOSING_WINNER = "CHOOSING_WINNER"
  this.STEP_REVIEWING_SUBMISSION = "REVIEWING_SUBMISSION"
  this.STEPS_ORDERED = [
    this.STEP_CHOOSING_GAME,
    this.STEP_CHOOSING_PLAYERS,
    this.STEP_CHOOSING_WINNER,
    this.STEP_REVIEWING_SUBMISSION,
  ]

  this.SELECT_ITEM = "SELECT_ITEM"
  this.DESELECT_ITEM = "DESELECT_ITEM"
  this.TOGGLE_ITEM = "TOGGLE_ITEM"
  this.SET_ITEM = "SET_ITEM"

  this.LOAD_ITEMS = "LOAD_ITEMS"

  // this.SAVE_NEW_GAME_RESULT = "SAVE_NEW_GAME_RESULT"
  // this.SAVE_NEW_ITEM = "SAVE_NEW_ITEM"

  // this.SHOW_MODAL = "SHOW_MODAL"
  // this.CLOSE_MODAL = "CLOSE_MODAL"

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
