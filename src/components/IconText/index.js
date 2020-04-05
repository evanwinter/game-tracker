import React from "react"
import "./styles.scss"

const IconText = ({ children, type = "default", size = "md" }) => {
	return (
		<div className="IconText" data-type={type} data-size={size}>
			{children}
		</div>
	)
}

export default IconText
