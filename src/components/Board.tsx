/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import useDogStore, { chartOptions, chartOptionsArea, setInfoSlice, setWebSocket } from '../store/baseParams/baseParams';
import { RootState, useAppDispatch, useAppSelector } from '../store/redux/store';
import { SocketState, useWebSocket } from '../client';
import TestChart from './TestChart';
import Link from '../routes/Link';
import { Route } from '../routes/Route';

const Board = () => {
	// const webSocket = useRef<WebSocket | null>(null);

	const [val, setVal] = useState<string[]>([]);

	// const getParams: baseParams[] = [
	// 	{ key: 'empNo', value: '18-182' },
	// 	{ key: 'offset', value: 10 },
	// 	{ key: 'limit', value: 20 },
	// ];
	// const getParams: getSampleParams = {
	// 	empNo: '18-182',
	// 	offset: 0,
	// 	limit: 10,
	// };

	// const clickEvent2 = () => {
	// 	data2.mutate(getParams);
	// 	// console.log(JSON.stringify(data2));
	// };

	const useStore = useDogStore();
	const [test, setTest] = useState(0);
	const [chartData1, setChartData1] = useState<number>(0);
	const [chartData2, setChartData2] = useState<number>(0);
	const [chartData3, setChartData3] = useState<number>(0);
	// const [areaData1, setAreaData1] = useState<number[]>([1, 5, 1, 5, 5, 1, 1]);
	// const [areaData2, setAreaData2] = useState<number[]>([10, 0, 10, 0, 10, 0, 10]);
	// const [areaData3, setAreaData3] = useState<number[]>([1, 100, 10, 100, 10, 100, 1]);
	const [areaData1, setAreaData1] = useState<number[]>([]);
	const [areaData2, setAreaData2] = useState<number[]>([]);
	const [areaData3, setAreaData3] = useState<number[]>([]);
	const state = useAppSelector((infoState: RootState) => infoState.ws);
	const dispatch = useAppDispatch();
	const [series1, setSeries1] = useState<ApexAxisChartSeries>([]);
	const [series2, setSeries2] = useState<ApexAxisChartSeries>([]);
	const [series3, setSeries3] = useState<ApexAxisChartSeries>([]);

	const [zuFlag, setZuFlag] = useState<boolean>(false);
	// const { responseMessage, wsState, webSocket } = useWebSocket((socketState) => {
	// 	if (socketState === SocketState.onNewMsgReceivced) {
	// 		console.log('onNewMessageReceived');
	// 	} else if (socketState === SocketState.onConnectionFailed) {
	// 		console.error('onConnectionFailed');
	// 	} else if (socketState === SocketState.onConnectionOpened) {
	// 		console.log('onConnectionOpened');
	// 	}
	// }, `ws://192.168.0.212:8080/api/socket`);
	const preventClose = (e: BeforeUnloadEvent) => {
		e.preventDefault();
		// e.returnValue = '';
	};
	useEffect(() => {
		(() => {
			window.addEventListener('beforeunload', preventClose);
		})();
		return () => {
			window.removeEventListener('beforeunload', preventClose);
			// webSocket?.send('bye');
		};
	}, []);
	useEffect(() => {
		setChartData1(useStore.info.out1);
		setChartData2(useStore.info.out2);
		setChartData3(useStore.info.out3);
	}, [useStore.info]);

	// useEffect(() => {
	// 	if (responseMessage !== '') {
	// 		useStore.setInfo(responseMessage);
	// 		dispatch(setInfoSlice(responseMessage));
	// 		// socket 저장 .. sessionStorage :: { }
	// 		useStore.setSocket(webSocket);
	// 		dispatch(setWebSocket(webSocket));
	// 		console.log(`ws JSON before setWs ::: ${JSON.stringify(useStore.ws)}`);

	// 		// sessionStorage.setItem('ws', JSON.stringify(webSocket?.OPEN));
	// 		useStore.setSocketOpenState(webSocket?.OPEN);
	// 	}
	// }, [responseMessage]);
	const clickSendEvent = () => {
		// console.log(wsState);
		// console.log(`ws JSON on Click Event ::: ${JSON.stringify(useStore.ws)}`);
		// console.log(`ws on Click Event ::: ${useStore.ws}`);
		if (state?.ws?.readyState === WebSocket.OPEN) {
			state.ws?.send('info');
		}
	};
	const clickReconnectEvent = () => {
		console.log(`Check State Before Reconnect  ::: ${useStore.ws.readyState}`);
		// if (useStore.ws.readyState !== WebSocket.CLOSED) {
		// }
	};
	const clickStoreEvnet = () => {
		console.log(`zustand info :::   ${useStore.info}`);
		console.log(`rtk info :::: ${state}`);
		console.log(`zustand Socket :::${useStore.ws}`);

		// 스토어에 저장된 소켓객체로 동작 .. 동작 OK 객체 보임
		// useStore.ws?.send('bye');
	};
	const clickOutEvent = () => {
		// console.log(useStore.info);
		if (state?.ws?.readyState === WebSocket.OPEN) {
			state?.ws?.send('bye');
			console.log(`close after out btn click  :::   ${state.ws.readyState}`);
		}
		if (state?.ws?.readyState === WebSocket.CLOSING) {
			console.log(`close after out btn click  :::   ${state.ws.readyState}`);
		}
		useStore.setSocketOpenState(WebSocket.CLOSING);
	};
	return (
		<>
			<div>
				{/* <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a> */}
			</div>
			<h1>Vite + React</h1>

			<button onClick={clickSendEvent}>ws send</button>
			<button onClick={clickStoreEvnet}>store state send</button>
			<button onClick={clickOutEvent}>out</button>
			<button onClick={clickReconnectEvent}>reconnect</button>
			<button onClick={() => {}}>BACK NAV</button>
			<Link href="/">back</Link>
			<Chart
				options={chartOptions}
				series={[
					{
						name: 'output',
						data: [chartData1, chartData2, chartData3],
					},
				]}
				type="bar"
				height={200}
			/>

			<ReactApexChart
				options={chartOptionsArea}
				// series={[
				// 	{
				// 		name: 'out1',
				// 		data: [areaData1],
				// 	},
				// ]}
				series={series1}
				type="line"
				height={200}
			/>
			<ReactApexChart
				options={chartOptionsArea}
				// series={[
				// 	{
				// 		name: 'out2',
				// 		data: [areaData2],
				// 	},
				// ]}
				series={series2}
				type="line"
				height={200}
			/>
			<ReactApexChart
				options={chartOptionsArea}
				series={[
					{
						name: 'out3',
						data: [areaData3],
					},
				]}
				// series={series3}
				type="line"
				height={200}
			/>

			<div className="card">
				{/* <button
					onClick={() => {
						setMyCount((count) => count + 1);
						console.log(import.meta.env.VITE_BASE_URL);
					}}
				>
					count is {myCount}
				</button>


				<button onClick={clickEvent2}>getTest</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p> */}
			</div>

			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	);
};

export default Board;
