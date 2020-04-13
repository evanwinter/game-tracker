import T from "@types"

const removeUid = (items, uid) => items.filter((item) => item.uid !== uid)

const initialState = {
  general: {
    step: T.STEPS_ORDERED[0],
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
  /**
   * state.general updaters + misc
   * -----------------------------
   */
  if (action.type === T.SET_STEP) {
    return {
      ...state,
      general: {
        ...state.general,
        step: action.nextStep,
      },
    }
  }

  if (action.type === T.NEXT_STEP) {
    return {
      ...state,
      general: {
        ...state.general,
        step: T.getNextStep(state.general.step),
      },
    }
  }

  if (action.type === T.PREV_STEP) {
    return {
      ...state,
      general: {
        ...state.general,
        step: T.getPrevStep(state.general.step),
      },
    }
  }

  if (action.type === T.RESTART) {
    return {
      ...state,
      session: initialState.session,
      general: {
        ...state.general,
        step: T.STEPS_ORDERED[0],
      },
    }
  }

  /**
   * state.session updaters
   * ----------------------
   */
  if (action.type === T.SET_ITEM) {
    return {
      ...state,
      session: {
        ...state.session,
        [action.destKey]: action.item,
      },
    }
  }

  if (action.type === T.SELECT_ITEM) {
    return {
      ...state,
      session: {
        ...state.session,
        [action.destKey]: [...state.session[action.destKey], action.item],
      },
    }
  }

  if (action.type === T.DESELECT_ITEM) {
    return {
      ...state,
      session: {
        [action.destKey]: removeUid(
          state.session[action.destKey],
          action.item.uid
        ),
      },
    }
  }

  /**
   * state.database updaters
   * ----------------------
   */
  if (action.type === T.LOAD_ITEMS) {
    return {
      ...state,
      database: {
        ...state.database,
        [action.itemType]: action.items,
      },
    }
  }

  if (action.type === T.SAVE_NEW_ITEM) {
    return {
      ...state,
      database: {
        ...state.database,
        [action.itemType]: [...state.database[action.itemType], action.value],
      },
    }
  }

  /**
   * state.modal updaters
   * ----------------------
   */
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

  if (action.type === T.CLOSE_MODAL) {
    return {
      ...state,
      modal: {
        ...state.modal,
        show: false,
      },
    }
  }

  return state
}

export default reducer
