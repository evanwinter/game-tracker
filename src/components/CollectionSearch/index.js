import React, { useEffect, useState } from "react"
import { useDebounce } from "@hooks"
import "./styles.scss"

/**
 * As user types into search bar, show matching items
 */
const CollectionSearch = ({ items }) => {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 250)
  const [suggestions, setSuggestions] = useState([])

  const handleChange = (e) => {
    setQuery(e.currentTarget.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (debouncedQuery) {
      const matchingItems = items.filter(
        (item) => item.uid.indexOf(debouncedQuery) > -1
      )
      setSuggestions(matchingItems)
    } else {
      setSuggestions([])
    }
  }, [debouncedQuery])

  return (
    <form className="CollectionSearch" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={"Search"}
      />
      {suggestions && suggestions.length > 0 && (
        <ul>
          {suggestions.map((sug) => (
            <li data-uid={sug.uid} key={sug.uid}>
              {sug.uid}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default CollectionSearch
