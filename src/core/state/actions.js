import T from "@types"

const Actions = {
	saveNewItem(dataKey, value) {
		return async (dispatch, getState, database) => {
			console.log(dataKey, value)
			console.log("adf")
			await database.saveNewItem(dataKey, value)
			await dispatch({
				type: T.SAVE_NEW_ITEM,
				dataKey: dataKey,
				value: value,
			})
		}
	},
}

export default Actions
