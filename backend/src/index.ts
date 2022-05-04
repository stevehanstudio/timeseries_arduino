import * as http from 'http'
import express, { Express, json, Request, Response } from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'

interface Post {
	tempType: string;
}

const app: Express = express()
app.use(cors())
app.use(json())
// app.use(cors({
// 	credentials: true,
// 	origin: 'http://localhost:3000'
// }))

app.post('/api/sensors/', (req: Request, res: Response) => {
	const { tempType } = req.body

	port.write(tempType, (err: Error | null | undefined) => {
		if (err) return console.log('Error on write:', err.message)
	})
	console.log('message written:', tempType)
	res.send('tempType change received')
})

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
})

// console.log('SerialPort:', SerialPort)
// const ReadLine = SerialPort.parsers.Readline
const port = new SerialPort({ path: 'COM7', baudRate: 9600 })
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

parser.on('data', (data: string) => {
	// console.log('Temperature:', data)
	io.sockets.emit('temperature', { timestamp: new Date(), temp: data })
})

parser.on('error', (error: Error) => {
	console.log(error)
})

server.listen(5000, () => {
	console.log('Listening on port 5000')
})
