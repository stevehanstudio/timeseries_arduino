import { useContext } from 'react'
import Switch from 'react-switch'
import { TempType } from '../Types'
// import { convertTemp } from './helpers'
import { AppContext, AppContextType } from '../context/AppContext'

const TempSwitch = () => {
	const { tempType, toggleTempType } = useContext(AppContext) as AppContextType

  const changeTempHandler = async () => {
		const newTempType: TempType =
			tempType === TempType.C ? TempType.F : TempType.C
		toggleTempType()
		try {
			const response = await fetch(`http://localhost:5000/api/sensors/`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ tempType: newTempType }),
			})
			if (response.ok) {
				console.log('tempType changed on server:', tempType)
			}
		} catch (error) {
			console.log('Error posting to server:', error)
		}
  }

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<span
				style={{
					paddingRight: '0.8rem',
					opacity: tempType === TempType.C ? 1 : '0.3',
				}}
			>
				Celsius
			</span>
			<span>
				<Switch
					onChange={changeTempHandler}
					checked={tempType === TempType.C ? false : true}
					uncheckedIcon={false}
					checkedIcon={false}
				/>
			</span>
			<span
				style={{
					paddingLeft: '0.6rem',
					opacity: tempType === TempType.F ? 1 : '0.3',
				}}
			>
				Fahrenheit
			</span>
		</div>
	)
}

export default TempSwitch