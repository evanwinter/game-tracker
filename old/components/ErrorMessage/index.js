import React from "react"
import { AlertCircle } from "react-feather"

import IconText from "@components/IconText"
import "./styles.scss"

const ErrorMessage = ({ error }) => (
	<div className="ErrorMessage">
		<IconText type={"error"} size={"sm"}>
			<AlertCircle width={16} />
			<span>{error}</span>
		</IconText>
	</div>
)

export default ErrorMessage
