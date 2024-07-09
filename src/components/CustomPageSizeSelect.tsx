import * as React from 'react';

type PageSizeSelectorProps = {
	onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
const size = [
	{ value: '5', key: '5' },
	{ value: '10', key: '10' },
	{ value: '50', key: '50' },
	{ value: '100', key: '100' },
];

export const CustomPageSizeSelect = ({ onSelect }: PageSizeSelectorProps) => (
	<select onChange={onSelect} className="page-size">
		{Array.from({ length: size.length }).map((_, index) => (
			<option key={size[index].value} value={size[index].value}>
				{size[index].key}
			</option>
		))}
	</select>
);
