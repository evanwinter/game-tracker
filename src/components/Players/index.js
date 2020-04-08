import React from "react"

import Collection from "@components/Collection"
import "./styles.scss"

const Players = () => (
	<Collection
		src="database"
		srcKey="players"
		destKey="players"
		heading="Who played?"
		subheading="Select all players, including yourself"
		multiSelect={true}
	/>
)

export default Players
