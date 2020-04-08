import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Actions from "@state/actions"
import { isLoggedIn } from "@services/authentication"

import CollectionList from "./CollectionList"
import Loader from "@components/Loader"
import "./styles.scss"

const Collection = ({
	src = "database",
	srcKey = "",
	dest = "session",
	destKey = "",
	heading = "",
	subheading = "",
	multiSelect = false,
	maxColumns = 3,
}) => {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)

	// Load items from Redux into component
	const items = useSelector((state) => state[src][srcKey])

	// Load items from Firebase into Redux (once)
	useEffect(() => {
		const loadCollection = async () => {
			setIsLoading(true)
			await dispatch(Actions.loadCollection(srcKey))
			setIsLoading(false)
		}

		const itemsReady = (items) => items && items.length > 0

		// check if user is logged in before fetching; if not, they'll
		// be redirected to /login before fetch completes, triggering
		// a state update on unmounted component
		if (isLoggedIn() && !isLoading && !itemsReady(items)) {
			loadCollection()
		}
	})

	const handleClick = (e) => {
		const { uid, isSelected } = e.currentTarget.dataset

		if (multiSelect) {
			// if multiselect enabled, toggle item in array at state[dest][destKey]
			dispatch(Actions.selectItem(destKey, uid, isSelected))
		} else {
			// else, set item in state[dest][destKey] and go to next step
			dispatch(Actions.setItem(destKey, uid))
			dispatch(Actions.nextStep())
		}
	}

	const listProps = {
		items,
		maxColumns,
		multiSelect,
		handleClick,
		src,
		srcKey,
		dest,
		destKey,
	}

	return (
		<div className="Collection">
			<header className="CollectionHeader">
				<h1>{heading}</h1>
				<p>{subheading}</p>
			</header>

			{isLoading ? <Loader /> : <CollectionList {...listProps} />}
		</div>
	)
}

export default Collection
