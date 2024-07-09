/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import useDogStore, { setInfoSlice, setWebSocket } from './store/baseParams/baseParams';
import { RootState, useAppDispatch, useAppSelector } from './store/redux/store';
import TestChart from './components/TestChart';
import { SocketState, useWebSocket } from './client';
import Board from './components/Board';
import List from './components/List';
import Tables from './components/Tables';
import ViewPostCard from './page/ViewPostCard';
import ProfileList from './components/ProfileList';

const App = () => {
	const useStore = useDogStore();
	const state = useAppSelector((infoState: RootState) => infoState.ws);
	const dispatch = useAppDispatch();
	const { responseMessage, wsState, webSocket } = useWebSocket((socketState) => {
		if (socketState === SocketState.onNewMsgReceivced) {
			console.log('onNewMessageReceived');
		} else if (socketState === SocketState.onConnectionFailed) {
			console.log('onConnectionFailed');
		} else if (socketState === SocketState.onConnectionOpened) {
			console.log('onConnectionOpened');
		}
		// }, `ws://192.168.0.212:9000/api/socket`);
	}, `ws://localhost:8080/api/socket`);
	useEffect(() => {
		if (responseMessage !== '') {
			useStore.setInfo(responseMessage);
			dispatch(setInfoSlice(responseMessage));
			// socket 저장 .. sessionStorage :: { }
			useStore.setSocket(webSocket.current);
			dispatch(setWebSocket(webSocket.current));
			console.log(`ws JSON before setWs ::: ${JSON.stringify(useStore.ws)}`);

			// sessionStorage.setItem('ws', JSON.stringify(webSocket?.OPEN));
			useStore.setSocketOpenState(webSocket?.current?.OPEN);
		}
	}, [responseMessage]);
	useEffect(() => {
		console.log(`create Web Socket ${state.ws} 123457`);
	}, []);
	const clickSendEvent = () => {
		console.log(wsState);
		// console.log(`ws JSON on Click Event ::: ${JSON.stringify(useStore.ws)}`);
		// console.log(`ws on Click Event ::: ${useStore.ws}`);
		state.ws?.send('info');
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
		if (useStore.ws.readyState !== WebSocket.CLOSED) state.ws?.send('bye');
		useStore.setSocketOpenState(WebSocket.CLOSING);
	};
	return (
		<BrowserRouter>
			<div className="wrapper">
				<Routes>
					<Route path="/board" element={<Board />} />
					<Route path="/chart" element={<TestChart ws={webSocket.current} />} />
					<Route path="/list" element={<List />} />
					<Route path="/profile" element={<ProfileList />} />
					<Route path="/table" element={<Tables />} />
					<Route path="/cardview" element={<ViewPostCard />} />
				</Routes>
				<Link to="/board"> LINK TO BOARD</Link>
				<Link to="/list"> LINK TO LIST</Link>
				<Link to="/table"> LINK TO TABLE</Link>
				<Link to="/cardview"> LINK TO VIEW POST CARD</Link>
			</div>
		</BrowserRouter>
	);
};
export default App;
