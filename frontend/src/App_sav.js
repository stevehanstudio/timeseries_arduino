// References:
// https://www.cluemediator.com/how-to-implement-socket-io-in-reactjs
// https://www.youtube.com/watch?v=djMy4QsPWiI

import { useState, useEffect } from 'react'
import io from "socket.io-client"
import './App.css'

// const socket = io.connect("http://localhost:5000")

const convertTemp = (tempK: float, tempType: string): float => {
  const tempC = tempK - 273.15;
  if (tempType === 'C')
    return tempC;
  else
    return ((tempC * 9.0) / 5.0 + 32.0);
}

function App() {
  // const [socket, setSocket] = useState(null)
  // const [socketConnected, setSocketConnected] = useState(false)
  const [temp, setTemp] = useState(0)
  const [tempType, setTempType] = useState('C')
  const socket = io.connect('http://localhost:5000')

  // useEffect(() => {
  //   setSocket(io('http://localhost:5000'), {
  //     withCredentials: true
  //   })
  // }, [])

  useEffect(() => {
    // if (!socket) return

    // socket.on('connect', () => {
    //   setSocketConnected(socket.connected)
    // })
    // socket.on('disconnect', () => {
    //   setSocketConnected(socket.connected)
    // })
    socket.on('temperature', data => {
      console.log("New Temperature:", data.temp)
      setTemp(data.temp)
    })
  }, [socket])

  // const fetchHandler = () => {
  //   fetch('http://localhost:5000/')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("Got message:", data)
  //     })
  //     .catch(err => {
  //       console.log("Error:", err)
  //     })
  // }

  const changeTempHandler = () => {
    setTempType(tempType === 'C' ? 'F' : 'C')
    socket.emit('change_temp_type', {
			tempType: tempType === 'C' ? 'F' : 'C'
		})
  }

  return (
		<div className='App'>
			{/* <div>
				<b>Connection status:</b>{' '}
				{socketConnected ? 'Connected' : 'Disconnected'}
			</div> */}
			<header className='App-header'>
				<h2>
					Temperature: {convertTemp(temp, tempType)}&#176;{tempType}
				</h2>
				{/* <div>-----</div>
				<button onClick={fetchHandler}>Fetch</button> */}
				<div>-----</div>
				<button id='temp-type' onClick={changeTempHandler}>
					{tempType === 'C' ? 'Celsius' : 'Fahrenheit'}
				</button>
			</header>
		</div>
  )
}

export default App;
