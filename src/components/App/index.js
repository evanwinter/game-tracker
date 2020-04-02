import React, { useState } from "react"
import Anime from "react-anime"
import { useSelector, useDispatch } from "react-redux"
import Players from "@components/Players"
import Winner from "@components/Winner"
import Review from "@components/Review"
import Games from "@components/Games"
import T from "@types"

const App = () => {
	const dispatch = useDispatch()
	const { step } = useSelector((state) => state.general)

	let content = "null"

	if (step === T.STEP_CHOOSING_GAME) content = <Games />
	if (step === T.STEP_CHOOSING_PLAYERS) content = <Players />
	if (step === T.STEP_CHOOSING_WINNER) content = <Winner />
	if (step === T.STEP_REVIEWING_SUBMISSION) content = <Review />

	const nextStep = () => {
		const nextIndex = T.STEPS_ORDERED.indexOf(step) + 1
		const nextStep = T.STEPS_ORDERED[T.STEPS_ORDERED.indexOf(step) + 1]
		if (nextIndex < T.STEPS_ORDERED.length && !!nextStep) {
			dispatch({
				type: T.SET_STEP,
				step: nextStep,
			})
		}
	}

	const prevStep = () => {
		const prevIndex = T.STEPS_ORDERED.indexOf(step) - 1
		const prevStep = T.STEPS_ORDERED[T.STEPS_ORDERED.indexOf(step) - 1]
		if (prevIndex > -1 && !!prevStep) {
			dispatch({
				type: T.SET_STEP,
				step: prevStep,
			})
		}
	}

	return (
		<div className="App">
			<header>
				<button onClick={prevStep}>Previous</button>
				<button onClick={nextStep}>Next</button>
			</header>
			<main>
				<Anime
					opacity={[0, 1]}
					translateY={[32, 0]}
					duration={500}
					easing={"easeInOutQuad"}>
					{content}
				</Anime>
			</main>
		</div>
	)
}

export default App

/*
query MyQuery {
  allGame {
    edges {
      node {
        title
      }
    }
  }
  allPlayer{
    edges{
      node{
        name
      }
    }
  }
  allResult {
    edges{
      node{
        title
        players
        winner
        timestamp
      }
    }
  }
}
*/
