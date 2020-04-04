import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { ArrowRight, ArrowLeft } from "react-feather"

import T from "@types"
import IconButton from "@components/IconButton"
import AddItemButton from "@components/AddItemButton"
import "./styles.scss"

const ActionBar = () => {
	const { step } = useSelector((state) => state.general)
	const stepMap = {
		[T.STEP_CHOOSING_GAME]: "games",
		[T.STEP_CHOOSING_PLAYERS]: "players",
	}

	const showAddItemButton = Object.keys(stepMap).includes(step)

	return (
		<div className="ActionBar">
			<div className="ActionBar__left">
				<BackButton step={step} />
			</div>
			<div className="ActionBar__center">
				{showAddItemButton && <AddItemButton dataKey={stepMap[step]} />}
			</div>
			<div className="ActionBar__right">
				<NextButton step={step} />
			</div>
		</div>
	)
}

const BackButton = ({ step }) => {
	const dispatch = useDispatch()

	const prevIndex = T.STEPS_ORDERED.indexOf(step) - 1
	const prevStep = T.STEPS_ORDERED[prevIndex]
	const outOfBounds = prevIndex < 0

	const prev = () => {
		if (prevStep && !outOfBounds) {
			dispatch({
				type: T.SET_STEP,
				nextStep: prevStep,
			})
		}
	}

	return (
		<IconButton
			classNames={["BackButton"]}
			onClick={prev}
			round={true}
			disabled={outOfBounds}>
			<ArrowLeft width={24} />
		</IconButton>
	)
}

const NextButton = ({ step }) => {
	const dispatch = useDispatch()
	const { game, players } = useSelector((state) => state.session)

	const nextIndex = T.STEPS_ORDERED.indexOf(step) + 1
	const nextStep = T.STEPS_ORDERED[nextIndex]
	const outOfBounds = nextIndex > T.STEPS_ORDERED.length

	const next = () => {
		if (nextStep && !outOfBounds) {
			dispatch({
				type: T.SET_STEP,
				nextStep: nextStep,
			})
		}
	}

	const nextDataIsReady = (step) => {
		if (step === T.STEP_CHOOSING_GAME) {
			return game.length > 0
		}
		if (step === T.STEP_CHOOSING_PLAYERS) {
			return players.length > 1
		}
	}

	return (
		<IconButton
			classNames={["NextButton"]}
			disabled={!nextDataIsReady(step) || outOfBounds}
			onClick={next}
			round={true}>
			<ArrowRight width={24} />
		</IconButton>
	)
}

export default ActionBar

/*
<button disabled={selectedPlayers.length < 2} onClick={handleSubmit}>
	Confirm Players
</button>
*/
