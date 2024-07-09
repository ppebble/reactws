import { useState, MouseEvent, ChangeEvent, useEffect, SetStateAction, ReactElement } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { format, subHours, subWeeks, subDays } from 'date-fns';
import { useNavigate } from 'react-router';
import { Button, Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useBoardListAction } from '../store/baseParams/board.store.modules';
import { CustomPageSizeSelect } from './CustomPageSizeSelect';

type TableProps = {
	title?: string;
	column: TableColumn<any>[];
	result: any;
};

const CustomTable = ({ title, column, result }: TableProps) => {
	const [pageSize, setPageSize] = useState(1);
	// const [currentState, setCurrentState] = useState(0);
	// const [pageState, setPageState] = useState(0);
	const [data, setData] = useState<[]>(result);

	// react-query로 조회한 데이터  = data

	useEffect(() => {
		setData(result);
		// setPageState(Math.ceil(data.length / pageSize));
	}, [result, data]);

	// const handlePagination = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, currentPage: SetStateAction<number>) => {
	// 	e.preventDefault();
	// 	setCurrentState(currentPage);
	// };
	// const onSearchHandler = (e: any) => {
	// 	if (e.key === 'Enter') {
	// 		console.log(e.target.value);
	// 	}
	// };
	// const handlePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
	// 	setPageSize(parseInt(event.target.value, 10));
	// 	setCurrentState(0);
	// };

	// return (
	// 	<>
	// 		<Table responsive>
	// 			<thead className="text-primary">
	// 				<tr>
	// 					<th>제목</th>
	// 					<th className="text-right">작성자</th>
	// 					<th className="text-right">작성일시</th>
	// 					<th className="text-center">Actions</th>
	// 				</tr>
	// 			</thead>
	// 			<tbody>
	// 				{data &&
	// 					data.map((item: any) => (
	// 						<tr key={item.id}>
	// 							<td style={{ width: '70%', paddingLeft: '20px' }}>{item.title}</td>
	// 							<td className="text-right">{item.author}</td>
	// 							<td className="text-right">{format(item.date, 'yyyy-MM-dd HH:mm:ss')}</td>
	// 							<td className="text-center">
	// 								<Button>action</Button>
	// 							</td>
	// 						</tr>
	// 					))}
	// 			</tbody>
	// 		</Table>
	// 		<Row>
	// 			<Pagination aria-label="pagination">
	// 				<PaginationItem disabled={currentState <= 0}>
	// 					<PaginationLink onClick={(e) => handlePagination(e, currentState - 1)} previous href="#" />
	// 				</PaginationItem>
	// 				{[...Array(pageState)].map((page, i) => (
	// 					// eslint-disable-next-line react/no-array-index-key
	// 					<PaginationItem active={i === currentState} key={i}>
	// 						<PaginationLink onClick={(e) => handlePagination(e, i)} href="#">
	// 							{i + 1}
	// 						</PaginationLink>
	// 					</PaginationItem>
	// 				))}
	// 				<PaginationItem disabled={currentState >= pageState - 1}>
	// 					<PaginationLink onClick={(e) => handlePagination(e, currentState + 1)} next href="#" />
	// 				</PaginationItem>
	// 			</Pagination>
	// 			<CustomPageSizeSelect onSelect={(e) => handlePageSize(e)} />
	// 		</Row>
	// 	</>
	// );
	return (
		<Table responsive>
			<DataTable title={title} columns={column} data={data} pagination />
		</Table>
	);
};

export default CustomTable;
