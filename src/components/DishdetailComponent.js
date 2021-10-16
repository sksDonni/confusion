import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import {
  Modal,
  ModalHeader,
  Label,
  ModalBody,
  Row,
  Button,
  Col,
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import Loading from "./LoadingComponent";
import { addComment, fetchDishes } from "../redux/ActionCreators";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    //event.preventDefault();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <Row className="form-group">
                <Label htmlFor="rating" md={6}>
                  {" "}
                  Ratings{" "}
                </Label>
                <Col md={12}>
                  <Control.select
                    id="rating"
                    model=".rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={6}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    id="name"
                    model=".name"
                    name="name"
                    placeholder="Your Name"
                    className="form-control"
                    innerRef={(input) => (this.name = input)}
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: " Must be greater than 2 characters",
                      maxLength: " Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={6}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model="comment"
                    id="comment"
                    name="comment"
                    placeholder="Comment"
                    className="form-control"
                    rows="6"
                    innerRef={(input) => (this.comment = input)}
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit Comment
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
        <button
          className="btn btn-outline-secondary p-1 my-3"
          onClick={this.toggleModal}
        >
          <span className="fa fa-pencil fa-lg mx-2"></span>
          Submit Comment
        </button>
      </div>
    );
  }
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, addComments, dishId }) {
  if (comments) {
    return (
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="list-unstyled">
            {comment.comment} <br />
            --{comment.author} {new Date(comment.date).toDateString().slice(4)}
          </div>
        ))}
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function Dishdetail(props) {
  console.log(props);
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-sm-12 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-sm-12 col-md-5 m-1">
            <h2>Comments</h2>
            {props.comments ? (
              <RenderComments
                comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="row"></div>;
  }
}

export default Dishdetail;
