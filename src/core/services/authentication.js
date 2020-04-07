import { isBrowser } from "@services/utilities"

const USER_KEY = "user"

export const getUser = () =>
	isBrowser() && window.localStorage.getItem(USER_KEY)
		? JSON.parse(window.localStorage.getItem(USER_KEY))
		: {}

export const setUser = (user) =>
	isBrowser() && window.localStorage.setItem(USER_KEY, JSON.stringify(user))

export const isLoggedIn = () => {
	const user = getUser()
	return !!user.email
}

export const logout = async (firebase) => {
	return new Promise((resolve) => {
		firebase
			.auth()
			.signOut()
			.then(function() {
				setUser({})
				resolve()
			})
	})
}
