export const convertTemp = (tempK: number): {tempC: number, tempF: number} => {
	const tempC = tempK - 273.15
	const tempF = (tempC * 9.0) / 5.0 + 32.0
	return { tempC, tempF }
}
