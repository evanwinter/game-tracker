import React, { useEffect } from "react"
import { navigate } from "@reach/router"
import { isLoggedIn } from "@services/authentication"
import Progress from "@components/Progress"
import LoadingScreen from "@components/LoadingScreen"

const Layout = ({ children, location }) => {
	useEffect(() => {
		if (!isLoggedIn() && location.pathname !== "/login") {
			navigate("/login")
		}
	})

	return (
		<>
			<LoadingScreen />

			<Progress />
			<div className="Layout">{children}</div>
		</>
	)
}

export default Layout
