import React, { useEffect } from "react"
import { navigate } from "@reach/router"
import { isLoggedIn } from "@auth"
import Progress from "@components/Progress"

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
