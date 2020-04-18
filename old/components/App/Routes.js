import React from "react"

import Types from "@types"

import Review from "@components/Review"

import Collection from "@components/Collection"

const Games = () => (
	<Collection 
		itemSrc="games"
	/>
)
	// <Collection
	// 	srcKey="games"
	// 	destKey="game"
	// 	heading="What did you play?"
	// 	multiSelect={false}
	// />

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

const Winner = () => (
	<Collection
		// displays state.session.players
		src="session"
		srcKey="players"
		// updates state.session.winner
		dest="session"
		destKey="winner"
		heading="Who won?"
		multiSelect={true}
		maxColumns={2}
	/>
)

const stepMap = {
	[Types.STEP_CHOOSING_GAME]: <Games />,
	[Types.STEP_CHOOSING_PLAYERS]: <Players />,
	[Types.STEP_CHOOSING_WINNER]: <Winner />,
	[Types.STEP_REVIEWING_SUBMISSION]: <Review />
}

export default stepMap
