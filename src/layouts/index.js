import React from "react"

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <header>Game Tracker</header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
