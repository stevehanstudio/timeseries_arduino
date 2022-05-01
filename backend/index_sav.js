// SerialPort Upgrade Guide - from 9.x to 10.x
// https://serialport.io/docs/guide-upgrade

// realtime dat viz https://itnext.io/real-time-sensor-data-visualisation-using-reactjs-nodejs-socket-io-and-raspberry-pi-d109fd5cb19d

// Arudino, NodeJS, Chart.js https://blog.priyanshrastogi.com/introduction-to-internet-of-things-with-arduino-node-js-and-chart-js-cb4885d176c4

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
// app.use(cors({
// 	credentials: true,
// 	origin: 'http://localhost:3000'
// }))

const server = http.createServer(app)
const io = require('socket.io')(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
})

const { SerialPort } = require('serialport')
console.log('SerialPort:', SerialPort)
// const ReadLine = SerialPort.parsers.Readline
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM7', baudRate: 9600 })
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

parser.on('data', data => {
	console.log('Temperature:', data)
	io.sockets.emit('temperature', { timestamp: new Date(), temp: data })
})

parser.on('error', error => {
	console.log(error)
})

// let interval

io.on('connection', client => {
	console.log(`Connected to the client: ${client.id}`)
	// if (interval) {
	// 	clearInterval(interval)
	// }
	// interval = setInterval(() => {

	// }, 1000)

	client.on('change_temp_type', data => {
		port.write(data.tempType, err => {
			return console.log('Error on write:', err.message);
		})
		console.log('message written:', data.tempType);
	})

	// client.on('disconnect', () => {
	// 	console.log('Disconnected')
	// 	clearInterval(interval)
	// })

	// client.on('subscribeToTemperature', interval => {
	// 	console.log('Client is subscribing with interval', interval);
	// })

	// setInterval(() => {
	// 	client.emit('getTemperature', 10)
	// }, interval)
})

server.listen(5000, err => {
	if (err) console.log(err)
	else console.log('Listening on port 5000')
})
