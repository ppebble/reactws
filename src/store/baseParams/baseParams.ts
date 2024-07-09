/* eslint-disable no-param-reassign */
import { ApexOptions } from 'apexcharts';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { createSlice } from '@reduxjs/toolkit';
import { subDays, subHours, subWeeks } from 'date-fns';
import { SocketState } from '../../client';

// 서버에서 받아올 데이터 구조가 정해지기 전에 테스트용도
export interface baseParams {
	key: any;
	value: any;
}
export const ReturnJsonData = (data: any) => {
	try {
		// JSON일 경우 .. 그대로return
		const json = JSON.parse(data);
		return data;
	} catch (error) {
		// JSON이 아닐경우 {data : inputData} 형식의 객체를 JSON으로 반환하여 리턴
		return JSON.stringify({ data });
	}
};
type infoType = {
	out1: number;
	out2: number;
	out3: number;
};
type SliceState = {
	info: { out1: number; out2: number; out3: number };
};
export const data = [
	{
		id: 5,
		title: 'ccceggdfgdfccccccc',
		author: 'human',
		date: subWeeks(new Date(), 3).getTime(),
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',
	},
	{
		id: 1,
		title: 'dfdwefweffsd',
		author: 'human',
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',

		date: subDays(new Date(), 2).getTime(),
	},
	{
		id: 2,
		title: '31fwf23',
		author: 'human',
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',

		date: subDays(new Date(), 6).getTime(),
	},
	{
		id: 3,
		title: 'Ggwefggg',
		author: 'human',
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',

		date: subHours(new Date(), 15).getTime(),
	},
	{
		id: 4,
		title: 'Afwefa',
		author: 'human',
		content: 'dddd123123123',
		date: subDays(new Date(), 4).getTime(),
	},
	{
		id: 6,
		title: 'cc344',
		author: 'human',
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',

		date: subWeeks(new Date(), 3).getTime(),
	},
	{
		id: 7,
		title: 'cefhgecccc',
		author: 'human',
		date: subWeeks(new Date(), 3).getTime(),
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',
	},
	{
		id: 8,
		title: 'df3463fsd',
		author: 'human',
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',

		date: subDays(new Date(), 2).getTime(),
	},
	{
		id: 9,
		title: '3134f',
		author: 'human',
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',

		date: subDays(new Date(), 6).getTime(),
	},
	{
		id: 10,
		title: 'G34fg',
		author: 'human',
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',

		date: subHours(new Date(), 15).getTime(),
	},
	{
		id: 41,
		title: 'A3463faa',
		author: 'human',
		content: 'dddd123123123',
		date: subDays(new Date(), 4).getTime(),
	},
	{
		id: 61,
		title: 'cccc125125ccc',
		author: 'human',
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',

		date: subWeeks(new Date(), 3).getTime(),
	},
	{
		id: 412,
		title: 'Aa123aa',
		author: 'human',
		content: 'dddd123123123',
		date: subDays(new Date(), 4).getTime(),
	},
	{
		id: 641,
		title: 'cccccccccc',
		author: 'human',
		content:
			'<p>56565</p><p><strong>23534534</strong></p><p><strong class="ql-size-huge"><em><s><u>ㅁㅇㄻㄴㄻㄴㄻㄴ</u></s></em></strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0);">235235</strong></p><p><strong class="ql-size-huge" style="color: rgb(178, 107, 0); background-color: rgb(178, 178, 0);">45645645</strong></p>',

		date: subWeeks(new Date(), 3).getTime(),
	},
];

interface DogStoreInf {
	info: infoType;
	ws: WebSocket;
	startFlag: boolean;
	socketState: number;
	setInfo: (r: string) => void;
	setSocket: (ws?: WebSocket) => void;
	setStartFlag: (flag: boolean) => void;
	setSocketOpenState: (state?: number) => void;
}

const useDogStore = create(
	persist<DogStoreInf>(
		(set) => ({
			info: {} as infoType,
			ws: {} as WebSocket,
			data: {} as JSON,
			socketState: 0,
			startFlag: false,
			setInfo: (res: string) => {
				console.log(`zustand in :::: ${res}`);
				if (res !== '') {
					const returnJson = ReturnJsonData(res);
					set({
						info: {
							out1: JSON.parse(returnJson).out1,
							out2: JSON.parse(returnJson).out2,
							out3: JSON.parse(returnJson).out3,
						},
					});
				}
			},
			setSocket: (socket?: WebSocket) => {
				set({ ws: socket });
			},
			setStartFlag: (flag: boolean) => {
				set({ startFlag: flag });
			},
			setSocketOpenState: (state?: number) => {
				set({ socketState: state });
			},
		}),
		{
			name: 'socket-store', // 저장소 key값
			storage: createJSONStorage(() => sessionStorage), // 저장소
			version: 1.0, // version 정보
		},
	),
);
// const initialState: SliceState = {
// 	info: { out1: 0, out2: 0, out3: 0 },
// };
export const wsSlice = createSlice({
	name: 'ws',
	initialState: { out1: 0, out2: 0, out3: 0, ws: {} as WebSocket },
	reducers: {
		setInfoSlice: (state, action) => {
			// state.info = action.payload;
			// console.log(JSON.parse(action.payload));
			console.log(`rtk in :::: ${action.payload}`);
			if (action.payload !== '') {
				const returnJson = ReturnJsonData(action.payload);
				state = JSON.parse(returnJson);
			}

			return state;
		},
		setWebSocket: (state, action) => {
			const returnJson = ReturnJsonData(action.payload);
			state.ws = returnJson;
			return state;
		},
	},
});
export const { setInfoSlice, setWebSocket } = wsSlice.actions;

export default useDogStore;
export const useToken = () => useDogStore((state) => state.info);

export const chartOptions: ApexOptions = {
	chart: {
		background: 'transparent',
		toolbar: {
			show: false,
		},
		type: 'bar',
		zoom: {
			enabled: false,
		},
	},
	fill: {
		gradient: {
			shade: 'light',
			type: 'bar',
			shadeIntensity: 0.1,
			inverseColors: false,
			opacityFrom: 0.8,
			opacityTo: 0,
			stops: [0, 100],
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 3,
	},
	legend: {
		show: false,
	},
	labels: ['out1', 'out2', 'out3'],
	xaxis: {
		labels: {
			show: false,
		},
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
	},
	yaxis: {
		show: false,
		tickAmount: 5,
	},
	tooltip: {
		x: {
			show: false,
		},
		y: {
			title: {
				formatter: () => 'data : mount',
			},
		},
		marker: {
			show: false,
		},
	},
};

export const chartOptionsArea: ApexOptions = {
	chart: {
		background: 'transparent',
		toolbar: {
			show: false,
		},
		sparkline: {
			enabled: true,
		},
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 3,
	},
	legend: {
		show: false,
	},
	xaxis: {
		categories: ['1', '2', '3', '4', '5', '6', '7'],
		labels: {
			show: false,
		},
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
	},
	yaxis: {
		show: false,
		tickAmount: 5,
	},
	tooltip: {
		x: {
			show: true,
		},
		y: {
			title: {
				formatter: () => 'Price: $',
			},
		},
		marker: {
			show: false,
		},
	},
};
