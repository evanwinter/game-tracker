import React from "react"
import { useSelector, useDispatch } from "react-redux"
import T from "@types"
import database from "@database"

const Review = () => {
	const dispatch = useDispatch()
	const { game, players, winner } = useSelector((state) => state.session)
	const time = Date.now()

	const handleSubmit = () => {
		const result = {
			game,
			players,
			winner,
			time,
		}

		database.saveGameResult(result)
	}

	const handleRestart = () => dispatch({ type: T.RESTART })

	return (
		<div className="Review">
			<hr />
			Review
			<ul>
				<li>Game: {game}</li>
				<li>Players: {players.join(", ")}</li>
				<li>Winner: {winner}</li>
				<li>Time: {time}</li>
			</ul>
			<button onClick={handleRestart}>Start Over</button>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	)
}

export default Review
