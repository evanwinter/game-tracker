import React from "react"
import { useSelector } from "react-redux"

import Players from "@components/Players"
import Winner from "@components/Winner"
import Review from "@components/Review"
import Games from "@components/Games"
import Modal from "@components/Modal"
import ActionBar from "@components/ActionBar"

import Types from "@types"

import "./styles.scss"

const App = () => {
	const { step } = useSelector((state) => state.general)

	const stepReducer = (step) => {
		if (step === Types.STEP_CHOOSING_GAME) return <Games />
		if (step === Types.STEP_CHOOSING_PLAYERS) return <Players />
		if (step === Types.STEP_CHOOSING_WINNER) return <Winner />
		if (step === Types.STEP_REVIEWING_SUBMISSION) return <Review />
	}

	return (
		<>
			<div className="App">{stepReducer(step)}</div>
			<ActionBar />
			<Modal />
		</>
	)
}

export default App
