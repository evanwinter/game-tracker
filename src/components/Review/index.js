import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { RefreshCw, Award, User, Clock, Box, CheckCircle } from "react-feather"
import IconButton from "@components/IconButton"
import { forUi } from "@utils"
import Actions from "@actions"
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

const SuccessMessage = ({ data }) => {
	return <p>Successfully saved game result to the database.</p>
}

const ErrorMessage = ({ error }) => {
	return <p>An error occurred saving game result to the database.</p>
}

const Review = () => {
	const dispatch = useDispatch()
	const { game, players, winner } = useSelector((state) => state.session)
	const time = Date.now()
	const humanFriendlyTime = new Date(time).toLocaleString()

	const handleSubmit = async () => {
		const result = {
			game,
			players,
			winner,
			time,
		}

		try {
			await dispatch(Actions.saveGameResult(result))
			dispatch(
				Actions.showModal(
					"Success",
					<>
						<SuccessMessage data={result} />
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
						<ErrorMessage error={err} />
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
				<div className="Review__item">{forUi(game)}</div>
				<div className="Review__item label">
					<span>Players</span>
					<User width={16} />
				</div>
				<div className="Review__item">{forUi(players.join(", "))}</div>
				<div className="Review__item label">
					<span>Winner</span>
					<Award width={16} />
				</div>
				<div className="Review__item">{forUi(winner)}</div>
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
