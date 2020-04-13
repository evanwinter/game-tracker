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
      word.charAt(0).toUpperCase() + word.substr(1, word.length).toLowerCase()
  )
  return capitalizedWords.join(" ")
}
