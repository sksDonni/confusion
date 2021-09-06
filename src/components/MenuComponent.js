import React from "react";
import {
	Card,
	CardImg,
	CardImgOverlay,
	CardText,
	CardBody,
	CardTitle,
} from "reactstrap";

function RenderMenuItem({ dish, onClick }) {
	return (
		<Card onClick={() => onClick(dish.id)}>
			<CardImg width="100%" src={dish.image} alt={dish.name} />
			<CardImgOverlay>
				<CardTitle>{dish.name}</CardTitle>
			</CardImgOverlay>
		</Card>
	);
}

function RenderMenu({ dishes, onClick }) {
	return (
		<>
			{dishes.map((dish) => (
				<div className="col-12 col-md-5 m-1 key=dish.id">
					<RenderMenuItem dish={dish} onClick={onClick} />
				</div>
			))}
		</>
	);
}

function Menu(props) {
	return (
		<div className="container">
			<div className="row">
				<RenderMenu dishes={props.dishes} onClick={props.onClick} />
			</div>
		</div>
	);
}

export default Menu;
