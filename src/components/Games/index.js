import React from "react"
import Collection from "@components/Collection"

const Games = () => {
	return (
		<div className="Games">
			<Collection
				srcKey="games"
				destKey="game"
				heading="What did you play?"
				multiSelect={false}
			/>
		</div>
	)
}

export default Games
