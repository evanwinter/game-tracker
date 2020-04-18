import React from "react"
import { useSelector } from "react-redux"
import { renderRoute } from "@components/Routes"
import Progress from "@components/Progress"
import Modal from "@components/Modal"
import "./styles.scss"

const App = () => {
  const { step } = useSelector((state) => state.general)

  return (
    <div className="App">
      <Progress />
      <Modal />

      <main>{renderRoute(step)}</main>
    </div>
  )
}

export default App
