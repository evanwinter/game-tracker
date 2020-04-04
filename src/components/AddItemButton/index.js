import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Plus } from "react-feather"
import database from "@database"
import Actions from "../../core/state/actions"
import { forUi } from "@utils"

import T from "@types"
import IconButton from "@components/IconButton"
import "./styles.scss"

const AddItemForm = ({ dataKey }) => {
	const dispatch = useDispatch()
	const inputRef = useRef(undefined)
	const [value, setValue] = useState("")
	const singleType = dataKey.substr(0, dataKey.length - 1)

	const handleChange = () => {
		setValue(inputRef.current.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		database.saveNewItem(dataKey, value)
		dispatch({
			type: T.SAVE_NEW_ITEM,
			dataKey: dataKey,
			value: value,
		})
	}

	const closeModal = () => dispatch({ type: T.CLOSE_MODAL })

	return (
		<form className="AddItemForm" onSubmit={handleSubmit}>
			{/* <label htmlFor={`add-${singleType}`}>Add a {singleType}</label> */}
			<div className="input-group">
				<input
					onChange={handleChange}
					value={value}
					ref={inputRef}
					id={`add-${singleType}`}
					type="text"
				/>
				<IconButton htmlType={"submit"} onClick={handleSubmit}>
					<Plus width={16} />
				</IconButton>
			</div>
			<div style={{ margin: `1rem 0` }}>
				<button onClick={closeModal}>Close</button>
			</div>
		</form>
	)
}

const AddItemButton = ({ dataKey }) => {
	const dispatch = useDispatch()
	const { step } = useSelector((state) => state.general)
	const singleType = dataKey.substr(0, dataKey.length - 1)

	const handleClick = () => {
		dispatch({
			type: T.SHOW_MODAL,
			headline: `Add a new ${forUi(singleType)}`,
			body: <AddItemForm dataKey={dataKey} />,
		})
	}

	const stepAllowsAdd = (step) => {
		return [T.STEP_CHOOSING_GAME, T.STEP_CHOOSING_PLAYERS].includes(step)
	}

	return (
		<div className="AddItemButton">
			<IconButton
				round={true}
				disabled={!stepAllowsAdd(step)}
				onClick={handleClick}
				iconLeft={true}>
				<Plus width={24} />
			</IconButton>
		</div>
	)
}

export default AddItemButton
