import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import T from "@types"
import database from "@database"
import AddPlayer from "./AddPlayer"

const Players = () => {
	const dispatch = useDispatch()
	const { players } = useSelector((state) => state.database)

	const [selectedPlayers, setSelectedPlayers] = useState([])
	const handleClick = (e) => {
		const { id, isSelected } = e.currentTarget.dataset
		if (JSON.parse(isSelected) === true) {
			setSelectedPlayers(selectedPlayers.filter((player) => player !== id))
		} else {
			setSelectedPlayers([...selectedPlayers, id])
		}
	}

	const handleSubmit = () => {
		dispatch({
			type: T.SET_PLAYERS,
			players: selectedPlayers,
		})

		dispatch({
			type: T.SET_STEP,
			step: T.STEP_CHOOSING_WINNER,
		})
	}

	useEffect(() => {
		const loadPlayers = async () => {
			const players = await database.fetchPlayers()
			if (players) {
				dispatch({
					type: T.LOAD_PLAYERS,
					players: players,
				})
			}
		}

		if (!players || players.length === 0) {
			loadPlayers()
		}
	}, [dispatch, players])

	return (
		<div className="Players">
			<hr />
			Players
			<ul>
				{players &&
					players.map((player) => {
						return (
							<li key={player}>
								<button
									data-id={player}
									data-is-selected={selectedPlayers.includes(player)}
									onClick={handleClick}>
									{player}
								</button>
							</li>
						)
					})}
			</ul>
			<button disabled={selectedPlayers.length < 2} onClick={handleSubmit}>
				Confirm Players
			</button>
			{selectedPlayers.length < 2 && (
				<small>Please select at least two players.</small>
			)}
			<AddPlayer />
		</div>
	)
}

export default Players
