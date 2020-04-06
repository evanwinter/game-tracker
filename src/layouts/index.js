import React, { useEffect } from "react"
import { navigate } from "@reach/router"

import Progress from "@components/Progress"

import { isLoggedIn } from "@services/authentication"

const Layout = ({ children }) => {
	useEffect(() => {
		if (!isLoggedIn()) {
			navigate("/login")
		}
	}, [])

	return (
		<>
			<Progress />
			<div className="Layout">{children}</div>
		</>
	)
}

export default Layout
