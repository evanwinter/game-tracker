import React from "react"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "@reach/router"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { setUser } from "@services/authentication"
import { isBrowser } from "@services/utilities"

const Login = () => {
	const getUiConfig = auth => ({
		signInFlow: "popup",
		signInOptions: [
			auth.GoogleAuthProvider.PROVIDER_ID,
			auth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccessWithAuthResult: result => {
				setUser(result.user)
				navigate("/group-login")
			}
		}
	})

	return (
		<div className="Login">
			<h1 className="section-heading">Login</h1>
			{isBrowser() && firebase && (
				<StyledFirebaseAuth
					uiConfig={getUiConfig(firebase.auth)}
					firebaseAuth={firebase.auth()}
				/>
			)}
		</div>
	)
}

export default Login
