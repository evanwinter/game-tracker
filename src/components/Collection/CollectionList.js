import React from "react"

import { sorted } from "@services/utilities"

import AnimatedList from "./AnimatedList"
import CollectionItem from "./CollectionItem"

const CollectionList = (props) => {
	const { maxColumns, items } = props
	const isEmpty = items.length === 0
	return (
		<ul className={`CollectionList grid grid-${maxColumns}`}>
			{isEmpty ? (
				<p>No items found.</p>
			) : (
				<AnimatedList>
					{items &&
						sorted(items, "uid").map(({ uid }) => {
							return <CollectionItem key={uid} uid={uid} {...props} />
						})}
				</AnimatedList>
			)}
		</ul>
	)
}

export default CollectionList
