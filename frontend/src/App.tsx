// References:
// https://www.cluemediator.com/how-to-implement-socket-io-in-reactjs
// https://www.youtube.com/watch?v=djMy4QsPWiI
// Context API https://www.youtube.com/watch?v=sP7ANcTpJr8
// Context API Tutorial https://www.youtube.com/watch?v=GS6aVjHxcgM
// Time-series Resharts example https://lifesaver.codes/answer/time-series-example-956
// useReducer with useContext - setting state to any type https://lazypandatech.com/blog/NextJs/44/How-to-create-React-Context-using-useReducer-and-useContext-hook-with-TypeScript/

import { useState, useEffect, useContext } from 'react'
import io from "socket.io-client"
import { TempType, DataItem, IncomingDataItem } from './Types'
import { convertTemp } from './helpers'
// import TempChart from './components/TempChart'
import ShowTemp from './components/ShowTemp'
import TempSwitch from './components/TempSwitch'
import { AppContext, AppContextType } from './context/AppContext'
// import Example2 from './Example2'
import TimeSeriesChart from './TimeSeriesChart'

function App() {
  const [tempC, setTempC] = useState(0)
  const [tempF, setTempF] = useState(0)

  const { totalCount, tempType, addData } = useContext(AppContext) as AppContextType
  const socket = io('http://localhost:5000')
  const temp = tempType === TempType.C ? tempC : tempF

  useEffect(() => {
    if (!socket) return

    socket.on('temperature', (inDataItem: IncomingDataItem) => {
      const {tempC, tempF} = convertTemp(inDataItem.temp)
      const dataItem: DataItem = {
        timestamp: inDataItem.timestamp,
        // count: totalCount,
        tempC,
        tempF,
      }
      setTempC(tempC)
      setTempF(tempF)
      addData(dataItem)
    })
  }, [socket, addData, totalCount])

  return (
		<div className='App'>
			<div className='App-header'>
        <h1>Time Series Data from Arudino</h1>
				<ShowTemp temp={temp} tempType={tempType} />
				<TempSwitch />
			</div>
      <TimeSeriesChart />
      {/* <Example2 /> */}
			{/* <TempChart /> */}
		</div>
  )
}

export default App;
