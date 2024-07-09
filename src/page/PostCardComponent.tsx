import * as React from 'react';
import { format } from 'date-fns';
import Dompurify from 'dompurify';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { PostInfo } from '../store/baseParams/board.store.modules';

type ParamType = {
	param: PostInfo;
};

const PostCardComponent = ({ param }: ParamType) => {
	return (
		<Card>
			<CardHeader variant="h4">
				Title: <b>{param.title}</b>
			</CardHeader>
			<CardBody sx={{ p: 4 }}>
				<Col md={0}>
					<Col xs={12} sm={4} md={3}>
						<div>Content:</div>
					</Col>
					<Col xs={12} sm={8} md={9}>
						<div
							dangerouslySetInnerHTML={{
								__html: Dompurify.sanitize(param.content),
							}}
						/>
					</Col>
					<Col xs={12} sm={4} md={3}>
						<div>Date:</div>
					</Col>
					<Col xs={12} sm={8} md={9}>
						<div>
							<div color="black">{format(param.date, 'yyyy-MM-dd HH:mm:ss')}</div>
						</div>
					</Col>
				</Col>
			</CardBody>
		</Card>
	);
};
export default PostCardComponent;
