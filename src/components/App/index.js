import React from "react"
import Games from "@components/Games"
import Players from "@components/Players"
import Winner from "@components/Winner"
import Review from "@components/Review"

const App = () => {
	return (
		<div className="App">
			<Games />
			<Players />
			<Winner />
			<Review />
		</div>
	)
}

export default App

/*
query MyQuery {
  allGame {
    edges {
      node {
        title
      }
    }
  }
  allPlayer{
    edges{
      node{
        name
      }
    }
  }
  allResult {
    edges{
      node{
        title
        players
        winner
        timestamp
      }
    }
  }
}
*/
