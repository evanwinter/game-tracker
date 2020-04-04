import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Actions from "@actions"
import AnimatedList from "@components/AnimatedList"

const Games = () => {
	const dispatch = useDispatch()
	const { games } = useSelector((state) => state.database)

	const handleClick = (e) => {
		const { id } = e.currentTarget.dataset
		dispatch(Actions.setGame(id))
	}

	useEffect(() => {
		const loadGames = async () => {
			await dispatch(Actions.loadGames())
		}

		if (!games || games.length < 1) {
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
