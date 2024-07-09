import * as React from 'react';
import Chart from 'react-apexcharts';
import useDogStore, { chartOptionsArea } from '../store/baseParams/baseParams';
import { RootState, useAppSelector } from '../store/redux/store';

type TestChartProps = {
	ws?: WebSocket;
};
const TestChart = ({ ws }: TestChartProps) => {
	const useStore = useDogStore();
	const state = useAppSelector((infoState: RootState) => infoState.ws);

	React.useEffect(() => {
		console.log(`CHILD COMP WS :::: `);
		console.log(ws);
		console.log(`WS OPEN:::: `);
		console.log(ws?.readyState);
	}, [ws]);
	return (
		<div>
			<Chart
				type="area"
				height={300}
				width="100%"
				series={
					[
						// {
						// 	name: 'Datas',
						// 	data: data?.map(() => data),
						// },
					]
				}
				options={{
					chart: {
						toolbar: {
							show: false,
						},
					},
					colors: ['#f90000'],
					stroke: { width: 1, curve: 'smooth' },
					dataLabels: { enabled: false },
					xaxis: {
						categories: ['1', '2', '3', '4', '5', '6', '7'],
					},
					yaxis: {
						show: false,
					},
				}}
			/>
		</div>
	);
};
export default TestChart;
