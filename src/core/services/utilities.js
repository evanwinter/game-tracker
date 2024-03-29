/**
 * Return true if the code is running in a dev/prod environment
 */
export const isDev = () => process.env.NODE_ENV === "development"
export const isProd = () => process.env.NODE_ENV === "production"

/**
 * Return true if the code is running in a browser environment
 * (meaning it's safe to access the `window` object)
 */
export const isBrowser = () => typeof window !== "undefined"

/**
 * Capitalizes the first letter of each word in a string.
 */
export const capitalize = (str) => {
	if (!str) return

	const words = str.split(" ")
	const capitalizedWords = words.map(
		(word) =>
			word.charAt(0).toUpperCase() + word.substr(1, word.length).toLowerCase(),
	)
	return capitalizedWords.join(" ")
}

/**
 * Format a string for storage in the database
 * Currently, just puts it in lower case. Eventually, might
 * remove spaces and do other things to normalize and reduce
 * issues with duplicates.
 */
export const dbFormat = (str) => str.toLowerCase()

/**
 * Format a string for display in the UI.
 * Currently, it just capitalizes the first letter of each word.
 * This isn't exactly what I want but close enough for now.
 */
export const uiFormat = (str) => capitalize(str)

/**
 * Return a sorted array. Optionally sort by a key property on each item,
 * instead of the item itself.
 * @param {array} items
 * @param {string} key
 */
export const sorted = (items, key = undefined) => {
	return items.sort((a, b) => {
		if (key) {
			return a[key] > b[key] ? 1 : -1
		} else {
			return a > b ? 1 : -1
		}
	})
}

/**
 * Return the key/value pair with the highest value
 */
export const max = (obj) => {
	return Object.entries(obj).reduce((a, b) => (obj[a[0]] > obj[b[0]] ? a : b))
}

/**
 * Return the key/value pair with the lowest value
 */
export const min = (obj) => {
	return Object.entries(obj).reduce((a, b) => (obj[a[0]] < obj[b[0]] ? a : b))
}
