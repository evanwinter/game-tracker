import React from "react"
import "./styles.scss"

const IconButton = (props) => {
	const {
		iconLeft = false,
		label = "",
		onClick = null,
		classNames = [],
		disabled = false,
		round = false,
		htmlType = null,
		children,
	} = props

	const classes = ["IconButton", ...classNames]
	if (round) classes.push("IconButton__round")

	return (
		<button
			disabled={disabled}
			type={htmlType}
			className={classes.join(" ")}
			data-icon-left={iconLeft}
			onClick={onClick}>
			{label && <span className="IconButton__label">{label}</span>}
			<div className="IconButton__icon">{children}</div>
		</button>
	)
}

export default IconButton
