import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import reducer from "./reducer"

// preloadedState will be passed in by the plugin
export default (preloadedState) => {
	if (process.env.NODE_ENV === "development") {
		return createStore(reducer, preloadedState, applyMiddleware(logger))
	}

	return createStore(reducer, preloadedState)
}
