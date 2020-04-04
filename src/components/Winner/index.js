import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Actions from "@actions"
import AnimatedList from "@components/AnimatedList"

const Winner = () => {
	const dispatch = useDispatch()
	const { players } = useSelector((state) => state.session)

	const handleClick = (e) => {
		const { id } = e.currentTarget.dataset
		dispatch(Actions.setWinner(id))
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
