import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Container } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import { newActivity,activityImage } from "../../actions/postActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import jwt_decode from 'jwt-decode';

class CreateActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      activityContent: "",
      activityTitle: "",
      location: "",
      activityDatetime: '',
      image: null,
    };

    this.handleChanged = this.handleChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const storedToken = localStorage.usertoken;
    if(storedToken)
    {
      const decoded = jwt_decode(storedToken)
      this.setState({
            userId: decoded.userId,
        })
    }
  }

  onDrop(img) {
    this.setState({
      image: img[0],
  });
}

  handleChanged(event) {
    //update the state value
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img',this.state.image)
    const activity = {
      userId: this.state.userId,
      activityContent: this.state.activityContent,
      activityTitle: this.state.activityTitle,
      location: this.state.location,
      activityDatetime: this.state.activityDatetime,
      img: formData,
    };
    this.props.newActivity(activity).then(this.props.activityImage(activity));;
    setTimeout((function() {
      window.location.reload();
    }), 1800);
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Activity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={12}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="ActivityTitle">
                    <Form.Label>Activity Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="activityTitle"
                      placeholder="ActivityTitle"
                      value={this.props.activityTitle}
                      onChange={this.handleChanged}
                    />
                  </Form.Group>

                  <Form.Group controlId="ActivityContent">
                    <Form.Label>Activity Content</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows="3"
                      name="activityContent"
                      required
                      placeholder="ActivityContent"
                      value={this.props.activityContent}
                      onChange={this.handleChanged}
                    />
                  </Form.Group>

                  <Form.Group controlId="Location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      required
                      placeholder="Location"
                      onChange={this.handleChanged}
                    />
                  </Form.Group>

                  <Form.Group controlId="ActivityDateTime">
                    <Form.Label>ActivityDateTime</Form.Label>
                    <Form.Control
                      type="date"
                      name="activityDatetime"
                      placeholder="ActivityDateTime"
                      onChange={this.handleChanged}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Upload Image</Form.Label>
                    <ImageUploader
                      withIcon={true}
                      buttonText="Choose images"
                      withPreview={true}
                      onChange={this.onDrop}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                      singleImage= {true}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add Activity
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CreateActivity.propType ={
    newActivity: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    token: state.token,
    activities: state.posts.activities
  })

export default connect(mapStateToProps, {newActivity,activityImage})(CreateActivity);