import React from "react"
import Anime from "react-anime"

import ListItem from "@components/ListItem"

import "./styles.scss"

const AnimatedList = ({
	items,
	dataKey,
	handleClick,
	multiSelect = false,
	maxColumns = 3,
}) => {
	console.log("items", items)
	return (
		<ul className={`AnimatedList grid grid-${maxColumns}`}>
			<Anime
				opacity={[0, 1]}
				translateY={[8, 0]}
				duration={350}
				delay={(el, i) => i * 75}
				easing={"easeInOutQuad"}>
				{items &&
					items
						.sort((a, b) => (a.uid > b.uid ? 1 : -1))
						.map(({ uid }) => {
							return (
								<li key={uid}>
									<ListItem
										uid={uid}
										parentClickHandler={handleClick}
										dataKey={dataKey}
										multiSelect={multiSelect}
									/>
								</li>
							)
						})}
			</Anime>
		</ul>
	)
}

export default AnimatedList
