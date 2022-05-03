import { TempType } from "../types/Types"

interface ShowTempType {
  temp: number
  tempType: TempType
}

const ShowTemp = ({ temp, tempType }: ShowTempType) => {
  return (
		<div style={{ display: 'block', marginBottom: '1.2rem', fontSize: '4rem'}}>
			{temp.toFixed(2)}&#176;{tempType}
		</div>
  )
}

export default ShowTemp