import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import T from "@types"
import database from "@database"
import AddGame from "./AddGame"

const Games = () => {
	const dispatch = useDispatch()
	const { games } = useSelector((state) => state.database)

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

	useEffect(() => {
		const loadGames = async () => {
			const games = await database.fetchGames()
			if (!games) return []

			dispatch({
				type: T.LOAD_GAMES,
				games: games,
			})
		}

		if (!games || games.length === 0) {
			loadGames()
		}
	}, [dispatch, games])

	return (
		<div className="Games">
			<hr />
			Games
			<ul>
				{games &&
					games.map((game) => {
						return (
							<li key={game}>
								<button data-id={game} onClick={handleClick}>
									{game}
								</button>
							</li>
						)
					})}
			</ul>
			<AddGame />
		</div>
	)
}

export default Games
