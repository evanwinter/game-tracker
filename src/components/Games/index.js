import React from "react"
import { useDispatch } from "react-redux"
import T from "@types"

const Games = () => {
	const dispatch = useDispatch()

	// games => all games stored in firestore
	const games = [
		"settlers of catan",
		"bananagrams",
		"carcassone",
		"gin rummy",
		"ticket to ride",
	]

	// on game select => (1) set session.game in redux and (2) set next step in redux
	const handleClick = (e) => {
		const { id } = e.currentTarget.dataset
		dispatch({
			type: T.SET_GAME,
			game: id,
		})
		dispatch({
			type: T.SET_STEP,
			step: T.STEP_CHOOSING_PLAYERS,
		})
	}

	return (
		<div className="Games">
			<hr />
			Games
			<ul>
				{games &&
					games.map((game) => {
						return (
							<li key={game} data-id={game} onClick={handleClick}>
								{game}
							</li>
						)
					})}
			</ul>
		</div>
	)
}

export default Games
