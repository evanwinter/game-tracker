import React, { useState } from "react"

const OptionsList = ({ data, multiSelect, handleSubmit }) => {
	const [selected, setSelected] = useState([])

	const handleClick = (e) => {
		// Handle multiselect behavior
		if (multiSelect) {
			const { id, isSelected } = e.currentTarget.dataset
			if (!isSelected) {
				const updatedSelected = [...selected, id]
				setSelected(updatedSelected)
			} else {
				const updatedSelected = selected.filter((item) => item !== id)
				setSelected(updatedSelected)
			}
		}

		// Handle single-select behavior
		else {
			handleSubmitFn(e)
		}
	}

	const handleSubmitFn = (e) => {
		handleSubmit(e)
	}

	return (
		<ul className="OptionsList">
			{data &&
				data.map((item) => {
					return (
						<li
							key={item}
							data-id={item}
							onClick={handleClick}
							data-is-selected={multiSelect && selected.includes(item)}>
							{item}
						</li>
					)
				})}
		</ul>
	)
}

export default OptionsList
