import React, { useEffect } from "react"
import { navigate } from "@reach/router"
import { isLoggedIn } from "@services/authentication"
import Progress from "@components/Progress"

const Layout = ({ children, location }) => {
	useEffect(() => {
		if (!isLoggedIn() && location.pathname !== "/login") {
			navigate("/login")
		}
	})

	return (
		<>
			<Progress />
			<div className="Layout">{children}</div>
		</>
	)
}

export default Layout
