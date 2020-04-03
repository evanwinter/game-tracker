export const capitalize = (str) => {
	if (!str) return

	const words = str.split(" ")
	const capitalizedWords = words.map(
		(word) =>
			word.charAt(0).toUpperCase() + word.substr(1, word.length).toLowerCase(),
	)
	return capitalizedWords.join(" ")
}

export const forDb = (str) => {
	return str.toLowerCase()
}

export const forUi = (str) => {
	return capitalize(str)
}
