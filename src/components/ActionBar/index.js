import React from "react"
import { BackButton, NextButton, AddButton } from "@components/ActionButtons"
import "./styles.scss"

const ActionBar = () => {
  return (
    <div className="ActionBar">
      <div className="ActionBar__left">
        <BackButton />
      </div>
      <div className="ActionBar__center">
        <AddButton />
      </div>
      <div className="ActionBar__right">
        <NextButton />
      </div>
    </div>
  )
}

export default ActionBar
