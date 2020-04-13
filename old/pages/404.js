import React from "react"
import { Link } from "gatsby"

const NotFound = () => {
  return (
    <div className="NotFound">
      404: Page not found.
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default NotFound
