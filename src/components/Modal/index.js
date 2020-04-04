import React from "react"
import { useSelector } from "react-redux"
import "./styles.scss"

const Modal = () => {
	const { modal } = useSelector((state) => state)
	const { show, content } = modal
	const { headline, body } = content

	return (
		<div className="Modal" data-show={show}>
			<div className="Modal__container">
				<h1>{headline}</h1>
				{body}
			</div>
		</div>
	)
}

export default Modal
