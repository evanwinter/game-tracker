import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import database from "@database"
import T from "@types"

const AddGame = () => {
	const dispatch = useDispatch()
	const inputRef = useRef(undefined)
	const [value, setValue] = useState("")

	const handleChange = () => {
		setValue(inputRef.current.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		database.saveNewGame(value)
		dispatch({
			type: T.SAVE_NEW_GAME,
			game: value,
		})
	}

	return (
		<form className="AddGame" onSubmit={handleSubmit}>
			<label htmlFor="add-game">Add a game</label>
			<input
				onChange={handleChange}
				value={value}
				ref={inputRef}
				id="add-game"
				type="text"
			/>
			<button type="submit">Add</button>
		</form>
	)
}

export default AddGame
