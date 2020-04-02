import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import reducer from "./reducer"

const middleware = []
if (process.env.DEVELOPMENT) middleware.push(logger)

// preloadedState will be passed in by the plugin
export default preloadedState => {
  return createStore(reducer, preloadedState, applyMiddleware(logger))
}
