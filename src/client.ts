import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { useEffect, useRef, useState } from 'react';
import { replaceEtcUrlToData } from './services/base/AxiosUtil';
import useDogStore from './store/baseParams/baseParams';

export type { AxiosResponse };

export const defaultConfig = {
	timeout: 10000,
	withCredentials: true,
	headers: {
		Accept: 'application/json',
	},
};

const client = axios.create({
	...defaultConfig,
});

client.interceptors.request.use(
	async (config: any) => {
		const { headers, data } = config;
		// 토큰정보가 필요한 경우 추가 입력
		// const accessToken = headers?.Authorization ? 'token' : localStorage?.getItem('access_token');
		return {
			...config,
			data,
			headers: {
				...headers,
			},
		};
	},
	(error) => {
		Promise.reject(error).then(() => {});
	},
);

client.interceptors.response.use(
	async (response: any) => {
		return replaceEtcUrlToData(response);
	},
	(error) => {
		Promise.reject(error).then(() => {});
	},
);

axiosRetry(client, { retries: 2 });
export default client;

export enum SocketState {
	onNewMsgReceivced = ' onNewMessageReceived',
	onConnectionFailed = 'onConnectionFailed',
	onConnectionOpened = 'onConnectionOpened',
}
export const useWebSocket = (onConnectionStateChanged: (state: SocketState) => void, url: string) => {
	// 응답받은 문자열을 넘겨줄 state
	const [responseMessage, setResponseMessage] = useState('');
	const webSocket = useRef<WebSocket>();
	const wsState = useRef<SocketState>(SocketState.onConnectionFailed);
	const useStore = useDogStore();

	// 소켓 연결 시작.
	const connectStart = () => {
		if (
			useStore.ws.readyState !== WebSocket.OPEN &&
			useStore.ws.readyState !== WebSocket.CLOSING &&
			useStore.ws.readyState !== WebSocket.CONNECTING
		) {
			const ws = new WebSocket(url);
			ws.onmessage = (e) => {
				e.preventDefault();
				const { data } = e;

				setResponseMessage(data);
				onConnectionStateChanged(SocketState.onNewMsgReceivced);
				wsState.current = SocketState.onNewMsgReceivced;
			};

			ws.onopen = () => {
				onConnectionStateChanged(SocketState.onConnectionOpened);
				wsState.current = SocketState.onConnectionOpened;
				ws.send('info');
				setInterval(() => {
					if (SocketState.onNewMsgReceivced === wsState.current && ws.readyState === ws.OPEN) {
						ws.send('info');
					}
				}, 3000000);
				webSocket.current = ws;
			};
			ws.onclose = () => {
				onConnectionStateChanged(SocketState.onConnectionFailed);
				wsState.current = SocketState.onConnectionFailed;
				console.log(`close state :::   ${ws.readyState}`);
				ws.close();
				console.log(`close after soon state :::   ${ws.readyState}`);
			};
		}
	};

	// 연결을 시작한다.
	useEffect(() => {
		if (wsState.current === SocketState.onConnectionFailed) {
			console.log(useStore.ws);
			if (useStore.socketState === WebSocket.OPEN) {
				// useStore.ws.send('bye');
			}
			console.log(' Socket connection fail .... new connection start ');
			connectStart();
		}
	}, []);

	return { responseMessage, wsState, webSocket, connectStart };
};
