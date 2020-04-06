export const capitalize = (str) => {
	if (!str) return

	const words = str.split(" ")
	const capitalizedWords = words.map(
		(word) =>
			word.charAt(0).toUpperCase() + word.substr(1, word.length).toLowerCase(),
	)
	return capitalizedWords.join(" ")
}

export const dbStr = (str) => {
	return str.toLowerCase()
}

export const uiStr = (str) => {
	return capitalize(str)
}
