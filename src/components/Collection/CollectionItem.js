import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { uiFormat } from "@services/utilities"

const CollectionItem = (props) => {
	const {
		handleClick: parentClickHandler,
		uid,
		dest,
		destKey,
		multiSelect,
	} = props

	const [isSelected, setIsSelected] = useState(false)

	// on click, call parent click handler as toggle selection
	const handleClick = (e) => {
		if (parentClickHandler) parentClickHandler(e)
		setIsSelected(!isSelected)
	}

	// check if this item is "selected", and hydrate local state if so
	const selectedItems = useSelector((state) => state[dest][destKey])
	useEffect(() => {
		if (
			multiSelect &&
			selectedItems &&
			selectedItems.find((item) => item.uid === uid)
		)
			setIsSelected(true)
	}, [multiSelect, selectedItems, uid])

	return (
		<li className="CollectionItem" key={uid}>
			<button
				data-uid={uid}
				data-is-selected={isSelected}
				onClick={handleClick}>
				{uiFormat(uid)}
			</button>
		</li>
	)
}

export default CollectionItem
