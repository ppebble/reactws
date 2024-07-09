import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { flexRender, getCoreRowModel, getPaginationRowModel, Updater, useReactTable } from '@tanstack/react-table';
import { CustomPageSizeSelect } from './CustomPageSizeSelect';

type TanstackTableProps = {
	column: any;
	result: any;
};

const CustomTable = ({ column, result }: TanstackTableProps) => {
	const [data, setData] = useState<[]>(result);

	const table = useReactTable({
		data,
		columns: column,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
	});

	useEffect(() => {
		setData(result);
	}, [result, data]);

	return (
		<Card>
			<CardHeader>
				<CardTitle tag="h4"> CARD TITLE </CardTitle>
			</CardHeader>
			<CardBody>
				<Table>
					<thead className="text-primary">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
				<Row className="flex-end">
					<CustomPageSizeSelect onSelect={(e) => table.setPageSize(e.target.value as unknown as Updater<number>)} />
					<Pagination aria-label="pagination">
						<PaginationItem disabled={!table.getCanPreviousPage()}>
							<PaginationLink onClick={() => table.previousPage()} previous href="#" />
						</PaginationItem>
						{[...Array(table.getPageCount())].map((_, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<PaginationItem active={i === table.getState().pagination.pageIndex} key={i}>
								<PaginationLink onClick={() => table.setPageIndex(i)} href="#">
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem disabled={!table.getCanNextPage()}>
							<PaginationLink onClick={() => table.nextPage()} next />
						</PaginationItem>
					</Pagination>
				</Row>
			</CardBody>
		</Card>
	);
};

export default CustomTable;
