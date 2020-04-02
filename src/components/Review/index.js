import React from "react"
import { useSelector } from "react-redux"

const Review = () => {
	const { game, players, winner } = useSelector((state) => state.session)
	const time = Date.now()

	// on submit =>
	// 		(1) create obj with data and a timestamp
	// 		(2) send to firestore "results" collection
	//		(3) check if there's a new player or game - if so, send to firestore collection
	const handleSubmit = () => {
		const result = {
			game,
			players,
			winner,
			time,
		}

		const isNewGame = false
		const isNewPlayers = false

		console.log("Saving to database", result)
	}

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
			<button onClick={handleSubmit}>Submit</button>
		</div>
	)
}

export default Review
