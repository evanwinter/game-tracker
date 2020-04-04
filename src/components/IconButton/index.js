import React from "react"
import "./styles.scss"

const IconButton = (props) => {
	const {
		iconLeft = false,
		label = null,
		onClick = null,
		classNames = [],
		children,
		disabled,
		round,
		htmlType,
	} = props

	const mergedClasses = ["IconButton", ...classNames]
	if (round) mergedClasses.push("IconButton__round")

	return (
		<button
			disabled={disabled}
			type={htmlType}
			className={mergedClasses.join(" ")}
			data-icon-left={iconLeft}
			onClick={onClick}>
			{label && <span className="IconButton__label">{label}</span>}
			<div className="IconButton__icon">{children}</div>
		</button>
	)
}

export default IconButton
