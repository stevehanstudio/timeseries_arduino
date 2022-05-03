import { useState, createContext, ReactNode, useContext, ReactElement } from 'react'
import { TempType } from '../Types'
import { DataItem } from '../Types'

export interface AppContextType {
  count: number
	data: DataItem[]
	tempType: TempType
	toggleTempType: () => void
  addData: (data: DataItem) => void
}

export const AppContext = createContext<AppContextType | null>(null)

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export const AppProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<DataItem[]>([])
  const [tempType, setTempType] = useState(TempType.C)

  const toggleTempType = () => {
    if (tempType === TempType.C) setTempType(TempType.F)
    else setTempType(TempType.C)
  }

  const addData = (dataItem: DataItem) => {
    setData([...data, dataItem])
    // data.push(dataItem)
    setCount(count+1)
  }

  return (
    <AppContext.Provider value={{ count, data, tempType, toggleTempType, addData }}>
      {children}
    </AppContext.Provider>
  )
}
