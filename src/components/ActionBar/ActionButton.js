import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ArrowRight, ArrowLeft } from "react-feather"

import IconButton from "@components/IconButton"

import Actions from "@state/actions"
import Types from "@types"

const MIN_ITEMS = 2

const BackButton = ({ step }) => {
	const dispatch = useDispatch()

	const prevIndex = Types.STEPS_ORDERED.indexOf(step) - 1
	const prevStep = Types.STEPS_ORDERED[prevIndex]
	const outOfBounds = prevIndex < 0
	const isDisabled = outOfBounds || !prevStep

	const prev = () => !isDisabled && dispatch(Actions.prevStep())

	return (
		<IconButton
			classNames={["BackButton"]}
			onClick={prev}
			round={true}
			disabled={isDisabled}>
			<ArrowLeft width={24} />
		</IconButton>
	)
}

const NextButton = ({ step }) => {
	const dispatch = useDispatch()
	const { winner, players } = useSelector((state) => state.session)

	const enoughPlayersSelected = (items) => items.length >= MIN_ITEMS
	const enoughWinnersSelected = (items) => items.length >= 1

	const isReady = (step) => {
		if (step === Types.STEP_CHOOSING_PLAYERS) {
			return enoughPlayersSelected(players) // show after 2+ players selected
		}
		if (step === Types.STEP_CHOOSING_WINNER) {
			return enoughWinnersSelected(winner) // show after 2+ players selected
		}
		return false
	}

	const nextIndex = Types.STEPS_ORDERED.indexOf(step) + 1
	const nextStep = Types.STEPS_ORDERED[nextIndex]
	const outOfBounds = nextIndex > Types.STEPS_ORDERED.length
	const isDisabled = outOfBounds || !nextStep || !isReady(step)

	const next = () => !isDisabled && dispatch(Actions.nextStep())

	return (
		<IconButton
			classNames={["NextButton"]}
			disabled={!isReady(step) || outOfBounds}
			onClick={next}
			round={true}>
			<ArrowRight width={24} />
		</IconButton>
	)
}

export { NextButton, BackButton }
