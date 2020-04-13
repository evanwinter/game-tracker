import React from "react"
import { useSelector } from "react-redux"

import Modal from "@components/Modal"
import Progress from "@components/Progress"
import ActionBar from "@components/ActionBar"

import routes from "./Routes"

import "./styles.scss"
import { isLoggedIn, isLoggedInGroup } from "../../core/services/authentication"

const App = () => {
	const { step } = useSelector(state => state.general)

	const renderStep = step => routes[step] || "Error displaying content."

	return (
		<>
			{isLoggedIn() && isLoggedInGroup() && (
				<>
					<Progress />
					<div className="App">{renderStep(step)}</div>
					<ActionBar />
				</>
			)}
			<Modal />
		</>
	)
}

export default App
