import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { uiFormat } from "@services/utilities"

const ListItem = ({
	uid,
	parentClickHandler,
	dataKey,
	multiSelect = false,
}) => {
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
			{uiFormat(uid)}
		</button>
	)
}
export default ListItem
