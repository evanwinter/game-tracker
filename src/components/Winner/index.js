import React from "react"

import Collection from "@components/Collection"

const Winner = () => {
	return (
		<div className="Winner">
			<Collection
				src="session"
				srcKey="players"
				dest="session"
				destKey="winner"
				heading="Who won?"
				multiSelect={false}
				maxColumns={2}
			/>
		</div>
	)
}
export default Winner
