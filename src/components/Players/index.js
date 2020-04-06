import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Actions from "@state/actions"
import AnimatedList from "@components/AnimatedList"

const Players = () => {
	const dispatch = useDispatch()
	const { players } = useSelector((state) => state.database)

	const handleClick = (e) => {
		const { uid, isSelected } = e.currentTarget.dataset
		console.log(uid, isSelected)
		dispatch(Actions.selectPlayer(uid, isSelected))
	}

	useEffect(() => {
		const loadPlayers = async () => {
			await dispatch(Actions.loadPlayers())
		}

		if (!players || players.length === 0) {
			loadPlayers()
		}
	}, [dispatch, players])

	return (
		<div className="Players">
			<h1>Who did you play with?</h1>
			<p>(Select at least two players)</p>
			<AnimatedList
				items={players}
				dataKey={"players"}
				multiSelect={true}
				handleClick={handleClick}
			/>
		</div>
	)
}

export default Players
