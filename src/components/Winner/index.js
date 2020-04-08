import React from "react"

import Collection from "@components/Collection"

const Winner = () => (
	<Collection
		src="session"
		srcKey="players"
		dest="session"
		destKey="winner"
		heading="Who won?"
		multiSelect={false}
		maxColumns={2}
	/>
)

export default Winner
