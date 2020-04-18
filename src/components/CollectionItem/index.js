import React from "react"
import { uiFormat } from "@services/utilities"
import "./styles.scss"

const CollectionItem = ({ item, isSelected }) => {
  return (
    <li className="CollectionItem">
      <button data-uid={item.uid} data-is-selected={isSelected}>
        {uiFormat(item.uid)}
      </button>
    </li>
  )
}

export default CollectionItem
