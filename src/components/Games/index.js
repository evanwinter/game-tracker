import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Games = () => {
	const gamesData = useStaticQuery(
		graphql`
			query {
				allGame {
					edges {
						node {
							title
						}
					}
				}
			}
		`,
	)

	const games = gamesData.allGame.edges
		.map((edge) => edge.node)
		.map((node) => node.title)

	return (
		<div className="Games">
			<hr />
			Games
			<ul>
				{games &&
					games.map((game) => {
						return <li key={game}>{game}</li>
					})}
			</ul>
		</div>
	)
}

export default Games
