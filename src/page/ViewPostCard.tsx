import { Col, Row } from 'reactstrap';
import { usePostList } from '../store/baseParams/board.store.modules';
import PostCardComponent from './PostCardComponent';

const ViewPostCard = () => {
	const postList = usePostList();
	return (
		<div className="main-panel">
			<div className="content">
				<Row className="space-even">
					<Col className="item" md={8}>
						{Array.from({ length: postList.length || 0 }).map((_, index) => (
							<Row key={postList[index].id}>
								<Col xs={12}>
									<PostCardComponent param={postList[index]} />
								</Col>
							</Row>
						))}
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default ViewPostCard;
