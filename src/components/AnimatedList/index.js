import React from "react"
import Anime from "react-anime"
import Button from "@components/Button"
import "./styles.scss"

const AnimatedList = ({
	items,
	dataKey,
	handleClick,
	multiSelect = false,
	maxColumns = 3,
}) => {
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
						.sort((a, b) => (a > b ? 1 : -1))
						.map((item) => {
							return (
								<li key={item}>
									<Button
										id={item}
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
