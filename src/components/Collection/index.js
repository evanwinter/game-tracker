import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Actions from "@state/actions"
import { isLoggedIn } from "@services/authentication"

import CollectionList from "./CollectionList"
import Loader from "@components/Loader"
import "./styles.scss"

const STATUSES = {
	initial: "initial",
	loading: "loading",
	completed: "completed",
}

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
	// enable redux action dispatches
	const dispatch = useDispatch()

	// status is either initial, loading (show loader), or completed (show items or "no items found")
	const [status, setStatus] = useState(STATUSES.initial)

	// render items from redux
	const items = useSelector((state) => state[src][srcKey])

	useEffect(() => {
		/**
		 * Fetch data from database and put it in redux store
		 */
		const loadCollection = async () => {
			setStatus(STATUSES.loading)
			await dispatch(Actions.fetchCollection(srcKey))
			setStatus(STATUSES.completed)
		}

		// if user is logged in and data hasn't been fetched yet, fetch data
		if (isLoggedIn() && status === STATUSES.initial) {
			loadCollection()
		}
	})

	/**
	 * Collection item click handler -- if Collection is multiselect,
	 * toggle selection; else set item in session data and advance to next step
	 */
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

	// props used by child components (List and Item)
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

			{status === STATUSES.loading && <Loader />}
			{status === STATUSES.completed && <CollectionList {...listProps} />}
			{status === STATUSES.initial && null}
		</div>
	)
}

export default Collection
