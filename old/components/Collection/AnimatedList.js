import React from "react"
import Anime from "react-anime"

const animeProps = {
	opacity: [0, 1],
	translateY: [8, 0],
	scale: [0.8, 1],
	duration: 350,
	delay: (el, i) => i * 75,
	easing: "easeInOutQuad"
}

const AnimatedList = ({ children }) => {
	return <Anime {...animeProps}>{children}</Anime>
}

export default AnimatedList
