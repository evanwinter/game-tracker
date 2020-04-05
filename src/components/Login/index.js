import React from "react"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "@reach/router"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { setUser, isLoggedIn } from "@auth"

const Login = () => {
	if (isLoggedIn()) {
		navigate("/")
	}

	const getUiConfig = (auth) => ({
		signInFlow: "popup",
		signInOptions: [
			auth.GoogleAuthProvider.PROVIDER_ID,
			auth.EmailAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: (result) => {
				setUser(result.user)
				navigate("/")
			},
		},
	})

	return (
		<>
			{firebase && (
				<StyledFirebaseAuth
					uiConfig={getUiConfig(firebase.auth)}
					firebaseAuth={firebase.auth()}
				/>
			)}
		</>
	)
}

export default Login
