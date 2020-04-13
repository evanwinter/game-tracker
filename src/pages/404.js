import React from "react"
import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <p>404 – there's nothing at this location.</p>
      <Link to="/">Back</Link>
    </div>
  )
}

export default NotFoundPage
