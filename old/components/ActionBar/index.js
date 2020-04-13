import React from "react"
import { useSelector } from "react-redux"

import { AddItemButton } from "@components/AddItem"
import { NextButton, BackButton } from "./ActionButton"

import "./styles.scss"

const ActionBar = () => {
	const { step } = useSelector((state) => state.general)

	return (
		<div className="ActionBar">
			<div className="ActionBar__left">
				<BackButton step={step} />
			</div>
			<div className="ActionBar__center">
				<AddItemButton step={step} />
			</div>
			<div className="ActionBar__right">
				<NextButton step={step} />
			</div>
		</div>
	)
}

export default ActionBar
