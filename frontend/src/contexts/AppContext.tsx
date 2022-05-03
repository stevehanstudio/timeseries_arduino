import { createContext, ReactNode, ReactElement, useReducer } from 'react'
import appReducer, { initialState } from './appReducer'
import { DataItem, TempType } from '../types/Types'

export type AppContextType = {
  totalCount: number
	data: DataItem[]
	tempType: TempType
	toggleTempType: () => void
  addData: (data: DataItem) => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType)
// export const AppContext = createContext<AppContextType | null>(null)

// export const useGlobalContext = () => {
//   return useContext(AppContext)
// }

export const AppProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  // const [totalCount, setTotalCount] = useState(0)
  // const [data, setData] = useState<DataItem[]>([])
  // const [tempType, setTempType] = useState(TempType.C)

  const toggleTempType = () => {
    dispatch({
      type: "TOGGLE_TEMP_TYPE"
    })
  }

  const addData = (dataItem: DataItem) => {
    // const updatedDataItem = state.data.count(dataItem)

    dispatch({
      type: "ADD_DATA",
      payload: dataItem
    })

    // setData([...data, dataItem])
    // // data.push(dataItem)
    // setTotalCount(totalCount+1)
    // console.log('Adding data', totalCount)
  }

  const value = {
    totalCount: state.totalCount,
    tempType: state.tempType,
    data: state.data,
    addData,
    toggleTempType
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
