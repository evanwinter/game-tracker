import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Actions from "@state/actions"
import AnimatedList from "@components/AnimatedList"
import Loader from "@components/Loader"

const Games = () => {
	const dispatch = useDispatch()
	const { games } = useSelector((state) => state.database)
	const [isLoading, setIsLoading] = useState(false)

	const handleClick = (e) => {
		const { uid } = e.currentTarget.dataset
		dispatch(Actions.setGame(uid))
	}

	useEffect(() => {
		const loadGames = async () => {
			setIsLoading(true)
			await dispatch(Actions.loadGames())
			setIsLoading(false)
		}

		if (!games || games.length < 1) {
			loadGames()
		}
	}, [dispatch, games])

	return (
		<div className="Games">
			<h1>What did you play?</h1>
			{isLoading ? (
				<Loader />
			) : games.length < 1 ? (
				"No games found."
			) : (
				<AnimatedList
					items={games}
					dataKey={"games"}
					handleClick={handleClick}
				/>
			)}
		</div>
	)
}

export default Games
