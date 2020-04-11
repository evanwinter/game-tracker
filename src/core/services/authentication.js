import { isBrowser } from "@services/utilities"

const USER_KEY = "user"
const GROUP_KEY = "group"

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

export const setGroup = () =>
	isBrowser() && window.localStorage.setItem(GROUP_KEY, "true")

export const getGroup = () =>
	isBrowser() && window.localStorage.getItem(GROUP_KEY)
		? JSON.parse(window.localStorage.getItem(GROUP_KEY))
		: false

export const isLoggedInGroup = () => {
	const group = getGroup()
	return !!group
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
