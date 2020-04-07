import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Anime from "react-anime"

import Actions from "@state/actions"
import { sorted } from "@services/utilities"

import ListItem from "@components/ListItem"
import Loader from "@components/Loader"
import "./styles.scss"

const animeProps = {
	opacity: [0, 1],
	translateY: [8, 0],
	scale: [0.8, 1],
	duration: 350,
	delay: (el, i) => i * 75,
	easing: "easeInOutQuad",
}

const DatabaseCollection = ({
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

	const items = useSelector((state) => state[src][srcKey])

	useEffect(() => {
		const loadCollection = async () => {
			setIsLoading(true)
			await dispatch(Actions.loadCollection(srcKey))
			setIsLoading(false)
		}

		if (!items || items.length < 1) {
			loadCollection()
		}
	})

	const handleClick = (e) => {
		const { uid, isSelected } = e.currentTarget.dataset

		if (multiSelect) {
			console.log(
				"Toggling item selection at destination: " + `state.${src}.${srcKey}`,
			)
			dispatch(Actions.selectItem(destKey, uid, isSelected))
		} else {
			console.log("Setting item at destination: " + `state.session.${destKey}`)
			dispatch(Actions.setItem(destKey, uid))
			dispatch(Actions.nextStep())
		}
	}

	return (
		<div className="Collection">
			<CollectionHeader heading={heading} subheading={subheading} />

			{isLoading ? (
				<Loader />
			) : (
				<ul className={`Collection__items grid grid-${maxColumns}`}>
					<Anime {...animeProps}>
						{items &&
							sorted(items, "uid").map(({ uid }) => {
								return (
									<li className="Collection__item" key={uid}>
										<ListItem
											uid={uid}
											parentClickHandler={handleClick}
											dataKey={srcKey}
											multiSelect={multiSelect}
										/>
									</li>
								)
							})}
					</Anime>
				</ul>
			)}
		</div>
	)
}

const CollectionHeader = ({ heading, subheading }) => (
	<header className="Collection__header">
		<h1 className="Collection__heading">{heading}</h1>
		<p className="Collection__subheading">{subheading}</p>
	</header>
)

export default DatabaseCollection
