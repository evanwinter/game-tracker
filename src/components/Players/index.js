import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Players = () => {
	const playersData = useStaticQuery(
		graphql`
			query {
				allPlayer {
					edges {
						node {
							name
						}
					}
				}
			}
		`,
	)

	const players = playersData.allPlayer.edges
		.map((edge) => edge.node)
		.map((node) => node.name)

	return (
		<div className="Players">
			<hr />
			Players
			<ul>
				{players &&
					players.map((player) => {
						return <li key={player}>{player}</li>
					})}
			</ul>
		</div>
	)
}

export default Players
