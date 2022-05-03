import { useContext } from 'react'
import {
	// Label,
	LineChart,
	Line,
	// CartesianGrid,
	XAxis,
	YAxis,
	// Tooltip,
	// ReferenceArea,
	ResponsiveContainer,
} from 'recharts'
import { AppContext, AppContextType } from '../context/AppContext'
import { TempType } from '../Types'

const TempChart = () => {
	// const { data, tempType } = useContext<AppContextInterface>(AppContext)
	const { data, tempType } = useContext(AppContext) as AppContextType

	return (
		<ResponsiveContainer width='100%' height={400}>
			<LineChart
				width={800}
				height={400}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				{/* <CartesianGrid strokeDasharray='3' horizontal='' vertical='true' /> */}
				<XAxis dataKey='count' type='number' />
				<YAxis
					dataKey={tempType === TempType.C ? 'tempC' : 'tempF'}
					type='number'
				/>
				<Line
					type='monotone'
					dataKey={tempType === TempType.C ? 'tempC' : 'tempF'}
					data={data}
					stroke='#ff7385'
					// dot={false}
					activeDot={{ r: 4 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default TempChart
