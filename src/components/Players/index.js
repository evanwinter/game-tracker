import React, { useState } from "react"
import { useDispatch } from "react-redux"
import T from "@types"

const Players = () => {
	// players => all players in firestore
	const players = ["evan", "leif", "martina", "emily"]

	const dispatch = useDispatch()
	const [selectedPlayers, setSelectedPlayers] = useState([])

	// on player click => add player to session.players
	const handleClick = (e) => {
		const { id, isSelected } = e.currentTarget.dataset
		if (JSON.parse(isSelected) === true) {
			setSelectedPlayers(selectedPlayers.filter((player) => player !== id))
		} else {
			setSelectedPlayers([...selectedPlayers, id])
		}
	}

	// on submit => set general.step
	const handleSubmit = (e) => {
		console.log(selectedPlayers)

		dispatch({
			type: T.SET_PLAYERS,
			players: selectedPlayers,
		})

		dispatch({
			type: T.SET_STEP,
			step: T.STEP_CHOOSING_WINNER,
		})
	}

	return (
		<div className="Players">
			<hr />
			Players
			<ul>
				{players &&
					players.map((player) => {
						return (
							<li
								key={player}
								data-id={player}
								data-is-selected={selectedPlayers.includes(player)}
								onClick={handleClick}>
								{player}
							</li>
						)
					})}
			</ul>
			<button onClick={handleSubmit}>Confirm Players</button>
		</div>
	)
}

export default Players
