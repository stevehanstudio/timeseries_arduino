// References:
// https://www.cluemediator.com/how-to-implement-socket-io-in-reactjs
// https://www.youtube.com/watch?v=djMy4QsPWiI
// Context API https://www.youtube.com/watch?v=sP7ANcTpJr8

import { useState, useEffect } from 'react'
import io from "socket.io-client"
import './App.css'
import Switch from 'react-switch'
import { TempType, DataItem, IncomingDataItem } from './Types'
import { convertTemp } from './helpers'
import TempChart from './components/TempChart'

const data:DataItem[] = []

function App() {
  const [tempC, setTempC] = useState(0)
  const [tempF, setTempF] = useState(0)
  const [tempType, setTempType] = useState<TempType>(TempType.C)
  const socket = io('http://localhost:5000')
  const temp = tempType === TempType.C ? tempC : tempF

  useEffect(() => {
    // if (!socket) return

    socket.on('temperature', (inDataItem: IncomingDataItem) => {
      // console.log("New Temperature:", data)
      const {tempC, tempF} = convertTemp(inDataItem.temp)
      setTempC(tempC)
      setTempF(tempF)
      data.push({timestamp: inDataItem.timestamp, tempC, tempF})
    })
  }, [socket])

  const changeTempHandler = async () => {
    const newTempType: TempType = tempType === TempType.C ? TempType.F : TempType.C
    setTempType(newTempType)
    try {
      const response = await fetch(`http://localhost:5000/api/sensors/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tempType: newTempType })
      })
      if (response.ok) {
        console.log('tempType changed on server:', tempType);
      }
    }
    catch(error) {
      console.log('Error posting to server:', error);
    }
  }

  return (
		<div className='App'>
			<header className='App-header'>
				<h2>
					Temperature: {temp.toFixed(2)}&#176;{tempType}
				</h2>
				<div>-----</div>
				<div>
					<span style={{ marginRight: '0.4rem' }}>Celsius</span>
					<span>
						<Switch
							onChange={changeTempHandler}
							checked={tempType === TempType.C ? false : true}
							uncheckedIcon={false}
							checkedIcon={false}
						/>
					</span>
					<span style={{ marginLeft: '0.4rem' }}>Fahrenheit</span>
				</div>
				<TempChart />
			</header>
		</div>
  )
}

export default App;
