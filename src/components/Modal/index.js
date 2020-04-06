import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Actions from "@state/actions"
import "./styles.scss"

const Modal = () => {
	const dispatch = useDispatch()
	const { modal } = useSelector((state) => state)
	const { show, content } = modal
	const { headline, body } = content

	const tryInputFocus = () => document.querySelector(".Modal input")?.focus()

	useEffect(() => {
		if (show) tryInputFocus()
	}, [show])

	const handleKeyDown = ({ key }) => {
		if (key.toLowerCase() === "escape") {
			dispatch(Actions.closeModal())
		}
	}

	return (
		<div
			className="Modal"
			role="dialog"
			onKeyDown={handleKeyDown}
			data-show={show}>
			<div className="Modal__container">
				<h1>{headline}</h1>
				{body}
			</div>
		</div>
	)
}

export default Modal
