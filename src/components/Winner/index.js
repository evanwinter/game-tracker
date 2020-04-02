import React from "react"
import { useSelector, useDispatch } from "react-redux"
import T from "@types"

const Winner = () => {
	const dispatch = useDispatch()

	// players => all players in session.players
	const { players } = useSelector((state) => state.session)

	// on player click => (1) set session.winner (2) set general.step
	const handleClick = (e) => {
		const { id } = e.currentTarget.dataset
		dispatch({
			type: T.SET_WINNER,
			winner: id,
		})

		dispatch({
			type: T.SET_STEP,
			step: T.STEP_REVIEWING_SUBMISSION,
		})
	}

	return (
		<div className="Winner">
			<hr />
			Winner
			<ul>
				{players &&
					players.map((player) => {
						return (
							<li onClick={handleClick} key={player} data-id={player}>
								{player}
							</li>
						)
					})}
			</ul>
		</div>
	)
}
export default Winner
