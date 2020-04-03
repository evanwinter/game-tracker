import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import T from "@types"
import database from "@database"

const AddPlayer = () => {
	const dispatch = useDispatch()

	const inputRef = useRef(undefined)
	const [value, setValue] = useState("")

	const handleChange = () => {
		setValue(inputRef.current.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		database.saveNewPlayer(value)
		dispatch({
			type: T.SAVE_NEW_PLAYER,
			player: value,
		})
	}

	return (
		<form className="AddPlayer" onSubmit={handleSubmit}>
			<label htmlFor="add-player">Add a player</label>
			<input
				onChange={handleChange}
				value={value}
				ref={inputRef}
				id="add-player"
				type="text"
			/>
			<button type="submit">Add</button>
		</form>
	)
}

export default AddPlayer
