import { useState, useEffect, useContext } from 'react'
import io from "socket.io-client"
import { TempType, DataItem, IncomingDataItem } from './types/Types'
import { convertTemp } from './utils/helpers'
import ShowTemp from './components/ShowTemp'
import TempSwitch from './components/TempSwitch'
import { AppContext, AppContextType } from './contexts/AppContext'
import TimeSeriesChart from './components/TimeSeriesChart'

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
		</div>
  )
}

export default App;
