import React, { PureComponent, MouseEvent } from 'react'
import {
	// Label,
	LineChart,
	Line,
	// CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ReferenceArea,
	ResponsiveContainer,
} from 'recharts'
// import { DataItem } from './Types'

export interface DataItem {
	count: number
	tempC: number
	tempF: number
}

const initialData: DataItem[] = [
	{ count: 0, tempC: 4.19, tempF: 110 },
	{ count: 1, tempC: 4.11, tempF: 110 },
	{ count: 2, tempC: 2.39, tempF: 110 },
	{ count: 3, tempC: 1.37, tempF: 90 },
	{ count: 4, tempC: 1.16, tempF: 92 },
	{ count: 5, tempC: 2.29, tempF: 93 },
	{ count: 6, tempC: 3.2, tempF: 94 },
	{ count: 7, tempC: 0.53, tempF: 95 },
	{ count: 8, tempC: 2.52, tempF: 97 },
	{ count: 9, tempC: 1.79, tempF: 98 },
	{ count: 10, tempC: 2.94, tempF: 99 },
	{ count: 11, tempC: 4.3, tempF: 93 },
	{ count: 12, tempC: 4.41, tempF: 103 },
	{ count: 13, tempC: 2.15, tempF: 108 },
	{ count: 14, tempC: 8, tempF: 106 },
	{ count: 15, tempC: 0, tempF: 105 },
	{ count: 16, tempC: 9, tempF: 104 },
	{ count: 17, tempC: 3, tempF: 102 },
	{ count: 18, tempC: 2.2, tempF: 111 },
	{ count: 19, tempC: 3, tempF: 112 },
	{ count: 20, tempC: 7, tempF: 115 },
]

const getAxisYDomain = (
	from: string | number,
	to: string | number,
	ref: 'count' | 'tempC' | 'tempF',
	offset: number
): [number, number] => {
	let refData: DataItem[]
	if (typeof from === "number" && typeof to === "number")
		refData = initialData.slice(from - 1, to)
	else
		refData = initialData

	let [bottom, top]:[number|string, number|string] = [0, 0]
	if (typeof ref === "string")
	[bottom, top] = [refData[0][ref], refData[0][ref]]
		refData.forEach(d => {
			if (d[ref] > top) top = d[ref]
			if (d[ref] < bottom) bottom = d[ref]
		})

	return [(bottom | 0) - offset, (top | 0) + offset]
}

type ExampleState = {
	tempType: string
	data: DataItem[]
	left: string | number
	right: string | number
	refAreaLeft: string | number
	refAreaRight: string | number
	top: string | number
	bottom: string | number
	animation: boolean
}

const initialState:ExampleState = {
	tempType: 'F',
	data: initialData,
	left: 'dataMin',
	right: 'dataMax',
	refAreaLeft: '',
	refAreaRight: '',
	top: 'dataMax+1',
	bottom: 'dataMin-1',
	animation: true,
}

export default class Example extends PureComponent<{}, ExampleState> {
	constructor(props: any) {
		super(props)
		this.state = initialState
	}

	zoom() {
		let { refAreaLeft, refAreaRight } = this.state
		const { data, tempType } = this.state

		if (refAreaLeft === refAreaRight || refAreaRight === '') {
			this.setState(() => ({
				refAreaLeft: '',
				refAreaRight: '',
			}))
			return
		}

		// xAxis domain
		if (refAreaLeft > refAreaRight)
			[refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

		// yAxis domain
		const [bottom, top] = getAxisYDomain(
			refAreaLeft,
			refAreaRight,
			tempType === 'C' ? 'tempC' : 'tempF',
			1
		)

		this.setState(() => ({
			refAreaLeft: '',
			refAreaRight: '',
			data: data.slice(),
			left: refAreaLeft,
			right: refAreaRight,
			bottom,
			top,
		}))
	}

	zoomOut() {
		const { data } = this.state
		this.setState(() => ({
			data: data.slice(),
			refAreaLeft: '',
			refAreaRight: '',
			left: 'dataMin',
			right: 'dataMax',
			top: 'dataMax+1',
			bottom: 'dataMin',
		}))
	}

	render() {
		const {
			data,
			tempType,
			// barIndex,
			left,
			right,
			refAreaLeft,
			refAreaRight,
			top,
			bottom,
		} = this.state

		return (
			<div
				className='highlight-bar-charts'
				style={{ userSelect: 'none', width: '100%' }}
			>
				<button
					type='button'
					className='btn update'
					onClick={this.zoomOut.bind(this)}
				>
					Zoom Out
				</button>

				<ResponsiveContainer width='90%' height={500}>
					<LineChart
						width={800}
						height={500}
						margin={{ top: 5, right: 30, left: 50, bottom: 40 }}
						data={data}
						onMouseDown={(
							nextState: any,
							e: MouseEvent<HTMLElement>
						) => {
							console.log('[onMouseDown] test active label', e)
							// this.setState({ refAreaLeft: e.activeLabel })}
						}}
						onMouseMove={(
							nextState: any,
							e: MouseEvent<HTMLElement>
						) => {
							console.log('[onMouseMove] test active label', e)
							// this.state.refAreaLeft &&
							// this.setState({ refAreaRight: e.activeLabel })
						}}
						// eslint-disable-next-line react/jsx-no-bind
						onMouseUp={this.zoom.bind(this)}
					>
						{/* <CartesianGrid
							strokeDasharray='3'
							horizontal=''
							vertical='true'
						/> */}
						<XAxis
							allowDataOverflow
							dataKey='count'
							domain={[left, right]}
							type='number'
							label={{
								value: 'Time',
								offset: -40,
								// angle: -90,
								position: 'insideBottom',
								// textAnchor: 'middle',
								// color: 'white',
								style: {
									fill: 'white',
								},
							}}
						/>
						<YAxis
							allowDataOverflow
							domain={[bottom, top]}
							type='number'
							yAxisId='1'
							// tick={{stroke: 'red', strokeWidth: 1}}
							label={{
								value: 'Temperature',
								offset: -15,
								angle: -90,
								position: 'insideLeft',
								textAnchor: 'middle',
								style: {
									fill: 'white',
								},
							}}
						/>
						<Tooltip />
						<Line
							yAxisId='1'
							type='natural'
							dataKey={tempType === 'C' ? 'tempC' : 'tempF'}
							stroke='#8884d8'
							// dot={false}
							dot={{ stroke: 'red', strokeWidth: 2 }}
							activeDot={{ r: 4 }}
							animationDuration={300}
						/>

						{refAreaLeft && refAreaRight ? (
							<ReferenceArea
								yAxisId='1'
								x1={refAreaLeft}
								x2={refAreaRight}
								strokeOpacity={0.3}
							/>
						) : null}
					</LineChart>
				</ResponsiveContainer>
			</div>
		)
	}
}
