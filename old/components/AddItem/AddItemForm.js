import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import ErrorMessage from "@components/ErrorMessage"

import Actions from "@state/actions"
import { dbFormat } from "@services/utilities"

const AddItemForm = ({ dataKey }) => {
	const dispatch = useDispatch()
	const [value, setValue] = useState("")
	const [error, setError] = useState(null)
	const singularType = dataKey.substr(0, dataKey.length - 1)
	const currentItems = useSelector((state) => state.database[dataKey])

	const handleChange = (e) => {
		setValue(e.currentTarget.value)
	}

	const validate = (items, value) => {
		const duplicate = !!items.find((item) => item.uid === value)
		if (duplicate) {
			setError("This item already exists!")
			return false
		}

		setError(null)
		return true
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		// format the value
		const formattedValue = dbFormat(value)
		// check if its a valid submission
		const valid = validate(currentItems, formattedValue)
		console.log(valid)
		if (valid) {
			// send to firebase and mirror in redux until next re-fetch
			dispatch(Actions.closeModal())
			await dispatch(Actions.saveNewItem(dataKey, formattedValue))
		}
	}

	const handleClose = () => {
		setValue("")
		setError(null)
		dispatch(Actions.closeModal())
	}

	useEffect(() => {
		validate(currentItems, dbFormat(value))
	}, [currentItems, value])

	const placeholderText = `${singularType === "game" ? "Title" : "Name"}`

	return (
		<>
			<form
				className="AddItemForm"
				data-error={!!error}
				onSubmit={handleSubmit}
				autoComplete={"off"}>
				<div className="input-group">
					<input
						onChange={handleChange}
						value={value}
						placeholder={placeholderText}
						id={`add-${singularType}`}
						type="text"
					/>
				</div>
				{error && <ErrorMessage error={error} />}
			</form>
			<div style={{ marginTop: `1rem`, display: `flex`, justifyContent: `center` }}>
				<button onClick={handleClose}>Close</button>
				<button className="green" onClick={handleSubmit} disabled={error}>
					Add
				</button>
			</div>
		</>
	)
}

export default AddItemForm
