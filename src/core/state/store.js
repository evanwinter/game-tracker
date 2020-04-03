import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import reducer from "./reducer"
import database from "@database"

const middleware = [thunk.withExtraArgument(database)]
if (process.env.NODE_ENV === "development") {
	middleware.push(logger)
}

// preloadedState will be passed in by the plugin
export default (preloadedState) => {
	// if (process.env.NODE_ENV === "development") {
	// 	return createStore(reducer, preloadedState, applyMiddleware(logger))
	// }

	// return createStore(reducer, preloadedState)

	return createStore(reducer, preloadedState, applyMiddleware(...middleware))
}
