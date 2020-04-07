import React from "react"
import App from "@components/App"
import Login from "@components/Login"
import { isLoggedIn } from "@services/authentication"

export default () => (isLoggedIn() ? <App /> : <Login />)
