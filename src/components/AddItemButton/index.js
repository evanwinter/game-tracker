import React, { useRef } from "react"
import Anime from "react-anime"
import { useDispatch, useSelector } from "react-redux"
import { Plus } from "react-feather"
import Actions from "@actions"
import { forUi } from "@utils"

import T from "@types"
import IconButton from "@components/IconButton"
import "./styles.scss"

const AddItemForm = ({ dataKey }) => {
	const dispatch = useDispatch()
	const inputRef = useRef(undefined)
	const singleType = dataKey.substr(0, dataKey.length - 1)

	const handleChange = (e) => {
		const { value } = e.currentTarget
		inputRef.current.value = value
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const value = inputRef.current
		if (value && value.length > 0) {
			dispatch(Actions.saveNewItem(dataKey, value))
			inputRef.current.value = ""
			closeModal()
		}
	}

	const closeModal = () => dispatch(Actions.closeModal())

	return (
		<form className="AddItemForm" onSubmit={handleSubmit}>
			<div className="input-group">
				<Anime
					width={["0", "100%"]}
					opacity={[0, 100]}
					duration={500}
					easing={"easeInQuint"}
					delay={150}>
					<input
						onChange={handleChange}
						ref={inputRef}
						placeholder={`e.g. ${singleType === "game" ? "Banagrams" : "Jane"}`}
						id={`add-${singleType}`}
						type="text"
					/>
				</Anime>
			</div>
			<div style={{ margin: `1rem 0` }}>
				<button onClick={closeModal}>Close</button>
			</div>
		</form>
	)
}

const AddItemButton = ({ dataKey }) => {
	const dispatch = useDispatch()
	const { step } = useSelector((state) => state.general)
	const singleType = dataKey.substr(0, dataKey.length - 1)

	const usesAddButton = (step) =>
		[T.STEP_CHOOSING_GAME, T.STEP_CHOOSING_PLAYERS].includes(step)

	const handleClick = () => {
		dispatch(
			Actions.showModal(
				`Add a new ${forUi(singleType)}`,
				<AddItemForm dataKey={dataKey} />,
			),
		)
	}

	return (
		<div className="AddItemButton">
			<IconButton
				round={true}
				disabled={!usesAddButton(step)}
				onClick={handleClick}
				iconLeft={true}>
				<Plus width={24} />
			</IconButton>
		</div>
	)
}

export default AddItemButton
