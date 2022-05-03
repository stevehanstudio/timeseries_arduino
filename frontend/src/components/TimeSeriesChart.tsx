import React, { useContext } from 'react'
import moment from 'moment'

import {
	ResponsiveContainer,
	Scatter,
	ScatterChart,
	Tooltip,
	XAxis,
	YAxis,
  ZAxis,
} from 'recharts'
import { AppContext, AppContextType } from '../contexts/AppContext'

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className='custom-tooltip'>
				<p>{`${moment(payload[0].value).format('MMMM Do YYYY, h:mm:ss a')}`}</p>
				<p>{`Temperature: ${parseFloat(payload[1].value).toFixed(2)}°`}</p>
      </div>
		)
	}
	return null
}

const TimeSeriesChart = () => {
  const { data: chartData, tempType } = useContext(AppContext) as AppContextType
  return (
		<ResponsiveContainer width='95%' height={500}>
			<ScatterChart margin={{ top: 5, right: 30, left: 50, bottom: 40 }}>
				<XAxis
					dataKey='timestamp'
					// domain={[0, 'auto']}
					// domain={[0, 10]}
					domain={['auto', 'auto']}
					// domain={['dataMax-20', 'dataMax + 1']}
					name='Time'
          tick={true}
					tickFormatter={unixTime =>
						// moment(unixTime).format('HH:mm:ss Do')
						moment(unixTime).format('mm:ss')
					}
					// type='number'
					// tickSize={1}
					label={{
						value: 'Time',
						offset: -30,
						position: 'insideBottom',
						// textAnchor: 'middle',
						style: {
							fill: 'white',
						},
					}}
				/>
				<Tooltip content={<CustomTooltip />} />
        <ZAxis range={[8,8]} />
				<YAxis
					dataKey={tempType === 'C' ? 'tempC' : 'tempF'}
					name='Temperature'
					domain={tempType === 'C' ? [16, 32] : [60, 76]}
					label={{
						value: `Temperature (°${tempType})`,
						offset: 0,
						angle: -90,
						position: 'insideLeft',
						textAnchor: 'middle',
						style: {
							fill: 'white',
						},
					}}
				/>

				<Scatter
					data={chartData}
					line={{ stroke: '#eee' }}
					lineJointType='monotoneX'
					lineType='joint'
					name='Values'
					color='white'
					fill='white'
					strokeWidth={1}
				/>
			</ScatterChart>
		</ResponsiveContainer>
  )
}

export default TimeSeriesChart
