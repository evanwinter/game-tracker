import React from "react"
import { isLoggedIn } from "@services/authentication"
import App from "@components/App"
import Login from "@components/Login"

const IndexPage = () => (isLoggedIn() ? <App /> : <Login />)

export default IndexPage
