import { createContext, ReactNode, useContext } from 'react'
import { TempType } from '../Types'
import { DataItem } from '../Types'

export interface AppContextInterface {
	data: DataItem[]
	tempC: number
	tempF: number
	tempType: TempType
}

type AppProviderProps = {
  children: ReactNode
}

const initialAppContext: AppContextInterface = {
	data: [],
  tempC: 0,
  tempF: 0,
	tempType: TempType.C
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AppContext.Provider value={initialAppContext}>
    {children}
  </AppContext.Provider>
)
