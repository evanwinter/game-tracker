import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { RefreshCw, Award, User, Clock, Box, CheckCircle } from "react-feather"
import IconButton from "@components/IconButton"
import { uiStr } from "@services/utilities"
import Actions from "@state/actions"
import "./styles.scss"

const CloseButton = ({ label = "Okay" }) => {
	const dispatch = useDispatch()
	const closeModal = () => dispatch(Actions.closeModal())
	return (
		<>
			<button onClick={closeModal}>{label}</button>
		</>
	)
}

const SuccessMessage = () => {
	return <p>Successfully saved game result to the database.</p>
}

const ErrorMessage = () => {
	return <p>An error occurred saving game result to the database.</p>
}

const Review = () => {
	const dispatch = useDispatch()
	const { game, players, winner } = useSelector((state) => state.session)
	const time = Date.now()
	const humanFriendlyTime = new Date(time).toLocaleString()

	const handleSubmit = async () => {
		const result = {
			game: game.uid,
			players: players.map((player) => player.uid),
			winner: winner.uid,
			time: time,
		}

		try {
			await dispatch(Actions.saveGameResult(result))
			dispatch(
				Actions.showModal(
					"Success",
					<>
						<SuccessMessage />
						<CloseButton />
					</>,
				),
			)

			setTimeout(() => {
				restart()
			}, 500)
		} catch (err) {
			dispatch(
				Actions.showModal(
					"Error",
					<>
						<ErrorMessage />
						<CloseButton />
					</>,
				),
			)

			setTimeout(() => {
				restart()
			}, 500)
		}
	}

	const restart = () => dispatch(Actions.restart())

	return (
		<div className="Review">
			<h1>Review</h1>
			<div className="Review__list grid one-third-two-thirds">
				<div className="Review__item label">
					<span>Game</span>
					<Box width={16} />
				</div>
				<div className="Review__item">{uiStr(game.uid)}</div>
				<div className="Review__item label">
					<span>Players</span>
					<User width={16} />
				</div>
				<div className="Review__item">
					{uiStr(players.map((player) => player.uid).join(", "))}
				</div>
				<div className="Review__item label">
					<span>Winner</span>
					<Award width={16} />
				</div>
				<div className="Review__item">{uiStr(winner.uid)}</div>
				<div className="Review__item label">
					<span>Time</span>
					<Clock width={16} />
				</div>
				<div className="Review__item">{humanFriendlyTime}</div>
			</div>
			<div className="Review__buttons">
				<IconButton label={"Start Over"} onClick={restart}>
					<RefreshCw width={16} />
				</IconButton>
				<IconButton
					classNames={["green"]}
					label={"Submit"}
					onClick={handleSubmit}>
					<CheckCircle width={16} />
				</IconButton>
			</div>
		</div>
	)
}

export default Review
