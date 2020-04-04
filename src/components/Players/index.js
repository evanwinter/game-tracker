import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import T from "@types"
import database from "@database"
import AnimatedList from "@components/AnimatedList"

const Players = () => {
	const dispatch = useDispatch()
	const { players } = useSelector((state) => state.database)

	const handleClick = (e) => {
		const { id, isSelected } = e.currentTarget.dataset
		dispatch({
			type: JSON.parse(isSelected) === true ? T.REMOVE_PLAYER : T.ADD_PLAYER,
			player: id,
		})
	}

	useEffect(() => {
		const loadPlayers = async () => {
			const players = await database.fetchPlayers()
			if (!players || players.length < 1) return

			dispatch({
				type: T.LOAD_PLAYERS,
				players: players,
			})
		}

		if (!players || players.length === 0) {
			loadPlayers()
		}
	}, [dispatch, players])

	return (
		<div className="Players">
			<h1>Select Players</h1>
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
