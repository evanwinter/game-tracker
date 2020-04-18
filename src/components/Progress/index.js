import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import T from "@types"
import "./styles.scss"

const Progress = () => {
  const { step } = useSelector((state) => state.general)

  const calculateProgress = (step, stepList) => {
    const index = stepList.indexOf(step)
    const numSteps = stepList.length - 1
    return Math.floor((index / numSteps) * 100)
  }

  /**
   * When `step` changes, update CSS variable that
   * controls the progress bar's width.
   */
  useEffect(() => {
    const percent = calculateProgress(step, T.STEPS_ORDERED)
    const percentStr = `${percent}%`

    document.documentElement.style.setProperty(
      "--progress-bar-width",
      percentStr
    )
  }, [step])

  return (
    <div className="Progress">
      <div className="track"></div>
      <div className="current-progress"></div>
    </div>
  )
}

export default Progress
