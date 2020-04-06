import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import ErrorMessage from "@components/ErrorMessage"

import Actions from "@state/actions"

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

	const handleSubmit = async (e) => {
		console.log("submit")

		e.preventDefault()
		const { value } = inputRef.current

		if (existingItems.map((item) => item.uid).includes(value.toLowerCase())) {
			setError("This item already exists.")
			return
		}

		if (value && value.length > 0) {
			await dispatch(Actions.saveNewItem(dataKey, value.toLowerCase()))
			dispatch(Actions.closeModal())
		}
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
				{error && <ErrorMessage error={error} />}
			</form>
			<div style={{ margin: `1rem 0` }}>
				<button onClick={() => dispatch(Actions.closeModal())}>Close</button>
				<button className="green" onClick={handleSubmit}>
					Add
				</button>
			</div>
		</>
	)
}

export default AddItemForm
