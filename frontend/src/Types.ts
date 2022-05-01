export enum TempType {
	C = 'C', // Celsius
	F = 'F', // Fahrenheit
}

export interface DataItem {
	timestamp: string
	tempC: number
	tempF: number
}

export interface IncomingDataItem {
	timestamp: string
	temp: number
}

