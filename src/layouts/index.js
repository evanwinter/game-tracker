import React from "react"

import Progress from "@components/Progress"

const Layout = ({ children }) => (
	<>
		<Progress />
		<div className="Layout">{children}</div>
	</>
)

export default Layout
