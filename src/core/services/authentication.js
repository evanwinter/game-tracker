import { isBrowser } from "@services/utilities"

const USER_KEY = "user"

/**
 * Set the logged-in user
 */
export const setUser = (user) =>
  isBrowser() && window.localStorage.setItem(USER_KEY, JSON.stringify(user))

/**
 * Get the logged-in user
 */
export const getUser = () =>
  isBrowser() && window.localStorage.getItem(USER_KEY)
    ? JSON.parse(window.localStorage.getItem(USER_KEY))
    : {}

/**
 * Return true if the current user is logged in
 */
export const isLoggedIn = () => {
  const user = getUser()
  return !!user.email
}

/**
 * Log out and clear the logged-in user's data
 */
export const logout = async (firebase) => {
  await firebase.auth().signOut()
  setUser({})
}
