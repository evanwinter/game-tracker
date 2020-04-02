import T from "@types"

const initialState = {
  general: {
    step: T.STEPS.CHOOSING_GAME,
    useOfflineData: true,
    offlineData: {
      games: [
        "Settlers of Catan",
        "Gin Rummy",
        "Carcassone",
        "Bananagrams",
        "Ticket to Ride",
      ],
      players: ["evan", "emily", "leif", "martina"],
    },
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

  if (action.type === T.SET_GAME) {
    return {
      ...state,
      session: {
        ...state.session,
        game: action.game,
      },
    }
  }
}

export default reducer
