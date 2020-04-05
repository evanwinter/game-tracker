import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Plus, AlertCircle } from "react-feather"
import Actions from "@actions"
import { forUi } from "@utils"
import T from "@types"
import IconButton from "@components/IconButton"
import IconText from "@components/IconText"
import "./styles.scss"

const AddItemForm = ({ dataKey }) => {
	const dispatch = useDispatch()
	const inputRef = useRef(undefined)
	const [error, setError] = useState(undefined)
	const singleType = dataKey.substr(0, dataKey.length - 1)
	const existingItems = useSelector((state) => state.database[dataKey])

	const handleChange = (e) => {
		const { value } = e.currentTarget
		inputRef.current.value = value
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { value } = inputRef.current

		if (existingItems.includes(value.toLowerCase())) {
			setError("This item already exists.")
			return
		}

		if (value && value.length > 0) {
			dispatch(Actions.saveNewItem(dataKey, value))
			inputRef.current.value = ""
			closeModal()
		}
	}

	const closeModal = () => {
		dispatch(Actions.closeModal())
	}

	const placeholderText = `${singleType === "game" ? "Title" : "Name"}`

	return (
		<>
			<form
				className="AddItemForm"
				data-error={error}
				onSubmit={handleSubmit}
				autoComplete={"off"}>
				<div className="input-group">
					<input
						onChange={handleChange}
						ref={inputRef}
						placeholder={placeholderText}
						id={`add-${singleType}`}
						type="text"
					/>
				</div>
				{error && (
					<IconText type={"error"} size={"sm"}>
						<AlertCircle width={16} />
						<span>{error}</span>
					</IconText>
				)}
			</form>
			<div style={{ margin: `1rem 0` }}>
				<button onClick={closeModal}>Close</button>
			</div>
		</>
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
				`Add ${forUi(singleType)}`,
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
