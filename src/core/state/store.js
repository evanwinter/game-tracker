import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

import reducer from "@state/reducer"
import database from "@services/database"
import { isDev } from "@services/utilities"

const middleware = [thunk.withExtraArgument(database)]
if (isDev()) {
	middleware.push(logger)
}

export default (preloadedState) => {
	return createStore(reducer, preloadedState, applyMiddleware(...middleware))
}
