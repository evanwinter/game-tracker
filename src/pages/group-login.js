import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { isLoggedInGroup, setGroup } from "@services/authentication"
import { navigate } from "gatsby"

const GroupLoginPage = () => {
	const [value, setValue] = useState("")

	const handleChange = (e) => {
		setValue(e.currentTarget.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const password = value
		if (password === process.env.GATSBY_GROUP_PASSWORD) {
			setGroup()
			navigate("/")
		}
	}

	useEffect(() => {
		if (isLoggedInGroup()) navigate("/")
	})

	return (
		<form onSubmit={handleSubmit} className="GroupLogin">
			<label htmlFor="group-password">Enter your group password:</label>
			<input
				value={value}
				id="group-password"
				type="text"
				onChange={handleChange}
			/>
			<button type="submit">Confirm</button>
		</form>
	)
}

export default GroupLoginPage
