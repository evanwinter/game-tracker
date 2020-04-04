import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { forUi } from "@utils"

const Button = ({ id, parentClickHandler, dataKey, multiSelect = false }) => {
	const items = useSelector((state) => state.session[dataKey])
	const [isSelected, setIsSelected] = useState(false)

	const handleClick = (e) => {
		if (parentClickHandler) parentClickHandler(e)
		setIsSelected(!isSelected)
	}

	useEffect(() => {
		if (items && multiSelect) setIsSelected(items.includes(id))
	}, [items, multiSelect, id])

	return (
		<button data-id={id} data-is-selected={isSelected} onClick={handleClick}>
			{forUi(id)}
		</button>
	)
}
export default Button
