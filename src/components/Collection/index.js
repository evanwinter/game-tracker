import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Actions from "@state/actions"
import CollectionItem from "@components/CollectionItem"
import CollectionSearch from "@components/CollectionSearch"
import "./styles.scss"

const STATUSES = {
  initial: "initial",
  loading: "loading",
  completed: "completed",
}

const Collection = ({
  srcPath = "",
  destPath = "",
  multiSelect = false,
  heading = "",
  subheading = "",
  useSearch = true,
}) => {
  const dispatch = useDispatch()

  /**
   * Pull items from Redux at state[srcType][srcKey]
   */
  const [srcType, srcKey] = srcPath.split(".")
  const items = useSelector((state) => state[srcType][srcKey])
  const [status, setStatus] = useState(STATUSES.initial)

  const loadCollection = async () => {
    setStatus(STATUSES.loading)
    await dispatch(Actions.loadItems(srcKey))
    setStatus(STATUSES.completed)
  }

  useEffect(() => {
    if (srcType === "database" && status === STATUSES.initial) {
      loadCollection()
    }
  })

  const [destType, destKey] = destPath.split(".")
  const selectedItems = useSelector((state) => state[destType][destKey])
  const handleClick = (e) => {
    const { uid, isSelected } = e.target.dataset
    if (!uid) return

    if (multiSelect) {
      dispatch(Actions.toggleItem(destKey, uid, isSelected))
    } else {
      dispatch(Actions.setItem(destKey, uid))
      dispatch(Actions.nextStep())
    }
  }

  const mapCollectionItems = (items, selectedItems) => {
    return (
      items &&
      items.map((item) => (
        <CollectionItem
          key={item.uid}
          isSelected={
            selectedItems && !!selectedItems.find(({ uid }) => uid === item.uid)
          }
          item={item}
        />
      ))
    )
  }

  return (
    <div className="Collection" onClick={handleClick}>
      {useSearch && <CollectionSearch items={items} />}

      <ul className="CollectionList">
        {mapCollectionItems(items, selectedItems)}
      </ul>
    </div>
  )
}

export default Collection
