import React from "react"
import Anime from "react-anime"
import { useSelector } from "react-redux"
import Players from "@components/Players"
import Winner from "@components/Winner"
import Review from "@components/Review"
import Games from "@components/Games"
import T from "@types"

const App = () => {
	const { step } = useSelector((state) => state.general)

	let content = "null"

	if (step === T.STEP_CHOOSING_GAME) content = <Games />
	if (step === T.STEP_CHOOSING_PLAYERS) content = <Players />
	if (step === T.STEP_CHOOSING_WINNER) content = <Winner />
	if (step === T.STEP_REVIEWING_SUBMISSION) content = <Review />

	return (
		<div className="App">
			<Anime
				opacity={[0, 1]}
				translateY={[32, 0]}
				duration={500}
				easing={"easeInOutQuad"}>
				{content}
			</Anime>
		</div>
	)
}

export default App

// const dispatch = useDispatch()
// const nextStep = () => {
// 	const nextIndex = T.STEPS_ORDERED.indexOf(step) + 1
// 	const nextStep = T.STEPS_ORDERED[T.STEPS_ORDERED.indexOf(step) + 1]
// 	if (nextIndex < T.STEPS_ORDERED.length && !!nextStep) {
// 		dispatch({
// 			type: T.SET_STEP,
// 			step: nextStep,
// 		})
// 	}
// }

// const prevStep = () => {
// 	const prevIndex = T.STEPS_ORDERED.indexOf(step) - 1
// 	const prevStep = T.STEPS_ORDERED[T.STEPS_ORDERED.indexOf(step) - 1]
// 	if (prevIndex > -1 && !!prevStep) {
// 		dispatch({
// 			type: T.SET_STEP,
// 			step: prevStep,
// 		})
// 	}
// }
