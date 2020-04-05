import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { forUi } from "@utils"

const Button = ({ uid, parentClickHandler, dataKey, multiSelect = false }) => {
	const items = useSelector((state) => state.session[dataKey])
	const [isSelected, setIsSelected] = useState(false)

	const handleClick = (e) => {
		if (parentClickHandler) parentClickHandler(e)
		setIsSelected(!isSelected)
	}

	useEffect(() => {
		const thisIsSelected = items && !!items.find((item) => item.uid === uid)
		if (items && multiSelect) setIsSelected(thisIsSelected)
	}, [items, multiSelect, uid])

	return (
		<button data-uid={uid} data-is-selected={isSelected} onClick={handleClick}>
			{forUi(uid)}
		</button>
	)
}
export default Button
