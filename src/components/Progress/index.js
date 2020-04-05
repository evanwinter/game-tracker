import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import T from "@types"
import "./styles.scss"

const Progress = () => {
	const { step } = useSelector((state) => state.general)

	useEffect(() => {
		const currentIndex = T.STEPS_ORDERED.indexOf(step)
		const numSteps = T.STEPS_ORDERED.length - 1 // because last step should show full progress bar
		const progress = Math.floor((currentIndex / numSteps) * 100)
		const progressValue = `${progress}%`

		document.documentElement.style.setProperty(
			"--progress-width",
			progressValue,
		)
	}, [step])

	return <div className="Progress"></div>
}

export default Progress
