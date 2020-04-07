import React from "react"

import Collection from "@components/Collection"
import "./styles.scss"

const Players = () => {
	return (
		<div className="Players">
			<Collection
				src="database"
				srcKey="players"
				destKey="players"
				heading="Who was playing?"
				subheading="Select all players, including yourself"
				multiSelect={true}
			/>
		</div>
	)
}

export default Players
