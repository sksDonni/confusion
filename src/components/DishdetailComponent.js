import React from "react";
import {
	Card,
	CardImg,
	CardImgOverlay,
	CardText,
	CardBody,
	CardTitle,
} from "reactstrap";

function RenderDish({ dish }) {
	return (
		<Card>
			<CardImg top src={dish.image} alt={dish.name} />
			<CardBody>
				<CardTitle>{dish.name}</CardTitle>
				<CardText>{dish.description}</CardText>
			</CardBody>
		</Card>
	);
}

function RenderComments({ comments }) {
	return (
		<div>
			{comments.map((comment) => (
				<div key={comment.id} className="list-unstyled">
					{comment.comment} <br />
					--{comment.author} {new Date(comment.date).toDateString().slice(4)}
				</div>
			))}
		</div>
	);
}

function Dishdetail(props) {
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-5 col-sm-12 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-sm-12 col-md-5 m-1">
						<h2>Comments</h2>
						<RenderComments comments={props.dish.comments} />
					</div>
				</div>
			</div>
		);
	} else {
		return <div className="row"></div>;
	}
}

export default Dishdetail;
