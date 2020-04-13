import React from "react"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "@reach/router"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { setUser } from "@services/authentication"

const Login = () => {
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
    <div className="Login">
      {firebase && (
        <StyledFirebaseAuth
          uiConfig={getUiConfig(firebase.auth)}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  )
}

export default Login
