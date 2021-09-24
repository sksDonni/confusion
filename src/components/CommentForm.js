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
} from "reactstrap";

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

export default CommentForm;
