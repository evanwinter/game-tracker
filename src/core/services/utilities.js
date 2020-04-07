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
