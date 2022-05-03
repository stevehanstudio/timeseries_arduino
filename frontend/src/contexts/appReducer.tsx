import { DataItem, TempType } from "../types/Types"

type AppState = {
	totalCount: number
	tempType: TempType
	data: DataItem[]
}

type AppAction = {
  type: 'ADD_DATA' | 'TOGGLE_TEMP_TYPE'
  payload?: DataItem
}

export const initialState:AppState = {
  totalCount: 0,
  tempType: TempType.C,
  data: []
}

// const appReducer: Reducer<AppState, AppAction> = (state, action) => {
const appReducer = (state:any, action: AppAction) => {
	const { type, payload } = action

	switch (type) {
		case 'ADD_DATA':
			console.log('Add data', payload)
			return {
				...state,
				totalCount: state.totalCount + 1,
				data: state.data.concat(payload)
			}
		case 'TOGGLE_TEMP_TYPE':
			console.log('Toggle Temp Type', payload)
			return {
				...state,
				tempType: state.tempType === TempType.C ? TempType.F : TempType.C,
			}
		default:
			// throw new Error("Error: Unknown action in appReducer")
			return state
	}
}

export default appReducer