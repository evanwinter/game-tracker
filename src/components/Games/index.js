import React from "react"
import Collection from "@components/Collection"

const Games = () => (
	<Collection
		srcKey="games"
		destKey="game"
		heading="What did you play?"
		multiSelect={false}
	/>
)

export default Games
