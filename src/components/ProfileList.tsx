import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { TableColumn } from 'react-data-table-component';
import { createColumnHelper } from '@tanstack/react-table';
import { useBoardListAction, usePostList, useProfile } from '../store/baseParams/board.store.modules';
import useDogStore, { data } from '../store/baseParams/baseParams';
import CustomTable from './CustomTable';
import TestService from '../services/testService';

type ColumnProps = {
	title: string;
	author: string;
	date: string;
};
const ProfileList = () => {
	const navigate = useNavigate();

	const useAction = useBoardListAction();
	const posts = usePostList();
	const useStore = useDogStore();
	const profile = TestService().getProfileQuery;
	const profileData = useProfile();

	// react-query로 조회한 데이터  = data
	useEffect(() => {
		useAction.setProfileList(profile.data || []);
		console.log(`POSTS ::::`);
		console.log(posts);
	}, []);

	const onClickHandler = (item: any) => {
		/**
		 *  Row의 Id를 기준으로 해당 게시글 조회..
		 */
		navigate(`/post/${item.id}`);
	};
	// const col: TableColumn<ColumnProps>[] = [
	// 	{ selector: (row) => row.title, name: '제목' },
	// 	{ selector: (row) => row.author, name: '작성자' },
	// 	{ selector: (row) => row.date, name: '날짜' },
	// ];
	const columnHelper = createColumnHelper();
	const columns = [
		columnHelper.accessor('empNo', { header: '사원번호' }),
		columnHelper.accessor('userId', { header: 'ID' }),
		columnHelper.accessor('hiredate', { header: '입사일' }),
	];

	return (
		<div className="main-panel">
			<div className="content">
				<Row>
					<Col md="12">
						<Button
							className="primary"
							onClick={() => {
								navigate('/board');
							}}
						>
							TO BOARD
						</Button>
						<Button
							onClick={() => {
								useStore.ws?.send('echo');
							}}
						>
							SEND SOCKET
						</Button>
						<CustomTable column={columns} result={profileData} />
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default ProfileList;
