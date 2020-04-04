import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import T from "@types"
import database from "@database"
import AnimatedList from "@components/AnimatedList"

const Games = () => {
	const dispatch = useDispatch()
	const { games } = useSelector((state) => state.database)

	const handleClick = (e) => {
		const { id } = e.currentTarget.dataset
		dispatch({
			type: T.SET_GAME,
			game: id,
			nextStep: T.STEP_CHOOSING_PLAYERS,
		})
	}

	useEffect(() => {
		const loadGames = async () => {
			const games = await database.fetchGames()
			if (!games || games.length < 1) return

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
			<h1>Choose a Game</h1>
			<AnimatedList items={games} dataKey={"games"} handleClick={handleClick} />
		</div>
	)
}

export default Games
