import React from "react"
import { useSelector, useDispatch } from "react-redux"
import T from "@types"
import AnimatedList from "@components/AnimatedList"

const Winner = () => {
	const dispatch = useDispatch()
	const { players } = useSelector((state) => state.session)

	const handleClick = (e) => {
		const { id } = e.currentTarget.dataset
		dispatch({
			type: T.SET_WINNER,
			winner: id,
			nextStep: T.STEP_REVIEWING_SUBMISSION,
		})
	}

	return (
		<div className="Winner">
			<h1>Select the winner</h1>
			<AnimatedList
				items={players}
				dataKey={"players"}
				multiSelect={false}
				handleClick={handleClick}
				maxColumns={2}
			/>
		</div>
	)
}
export default Winner
