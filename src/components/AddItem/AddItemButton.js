import React from "react"
import { useDispatch } from "react-redux"
import { Plus } from "react-feather"

import AddItemForm from "./AddItemForm"
import IconButton from "@components/IconButton"

import Actions from "@state/actions"
import Types from "@types"
import { uiStr } from "@services/utilities"

const AddItemButton = ({ step }) => {
	console.log(step)

	const dispatch = useDispatch()

	// get the data key for the current step
	const dataKey = Types.STEPS_WITH_ADD[step]
	const isDisabled = !dataKey

	// if not found, return null so as to not render the button
	if (isDisabled) return null

	// convert plural key ("games") to singluar ("game")
	const dataKeySingluar = dataKey.substr(0, dataKey.length - 1)

	const handleClick = () => {
		dispatch(
			Actions.showModal(
				`Add ${uiStr(dataKeySingluar)}`,
				<AddItemForm dataKey={dataKey} />,
			),
		)
	}

	return (
		<div className="AddItemButton">
			<IconButton
				round={true}
				disabled={isDisabled}
				onClick={handleClick}
				iconLeft={true}>
				<Plus width={24} />
			</IconButton>
		</div>
	)
}

export default AddItemButton
