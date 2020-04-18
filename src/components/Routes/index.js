import React from "react"
import T from "@types"

import Collection from "@components/Collection"
// import Review from "@components/Review"

const Games = () => (
  <Collection
    srcPath="database.games"
    destPath="session.game"
    multiSelect={false}
    heading="What did you play?"
  />
)
// <Collection
//   srcKey="games"
//   destKey="game"
//   heading="What did you play?"
//   multiSelect={false}
// />

const Players = () => (
  <Collection
    srcPath="database.players"
    destPath="session.players"
    multiSelect={true}
    heading="Who played?"
    subheading="Select all players, including yourself"
  />
)
// <Collection
//   src="database"
//   srcKey="players"
//   destKey="players"
// heading="Who played?"
// subheading="Select all players, including yourself"
//   multiSelect={true}
// />

const Winner = () => (
  <Collection
    srcPath="session.players"
    destPath="session.winner"
    multiSelect={true}
    useSearch={false}
    heading="Who won?"
  />
)
// <Collection
//   // displays state.session.players
//   src="session"
//   srcKey="players"
//   // updates state.session.winner
//   dest="session"
//   destKey="winner"
//   heading="Who won?"
//   multiSelect={true}
//   maxColumns={2}
// />

const Routes = {
  [T.STEP_CHOOSING_GAME]: <Games />,
  [T.STEP_CHOOSING_PLAYERS]: <Players />,
  [T.STEP_CHOOSING_WINNER]: <Winner />,
  // [T.STEP_REVIEWING_SUBMISSION]: <Review />
}

export default Routes

const notFound = "No route defined for this step."
export const renderRoute = (step) => Routes[step] || notFound
