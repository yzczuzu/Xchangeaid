import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Container } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import { newArticle,articleImage } from "../../actions/postActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import jwt_decode from 'jwt-decode';

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      articleContent: "",
      articleTitle: "",
      image: null,
    };

    this.handleChanged = this.handleChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount(){
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
      // console.log(img);
      // let reader = new FileReader();
      // reader.readAsText(img[0]);
      // let result = reader.result;
      // console.log(img);
      // console.log("picture exists")
      // let index = img.length-1;
      // const formData = new FormData();
      // formData.append('file',img[index],img[index].name);
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
    //call Api to database
    const formData = new FormData();
    formData.append('img',this.state.image)
    event.preventDefault();
    const article = {
      userId: this.state.userId,
      articleContent: this.state.articleContent,
      articleTitle: this.state.articleTitle,
      img: formData,
    };
    this.props.newArticle(article).then(this.props.articleImage(article));
    
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
            Add Article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={12}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="ArticleTitle">
                    <Form.Label>Article Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="articleTitle"
                      placeholder="ArticleTitle"
                      value={this.props.articleTitle}
                      onChange={this.handleChanged}
                    />
                  </Form.Group>

                  <Form.Group controlId="ArticleContent">
                    <Form.Label>Article Content</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows="3"
                      name="articleContent"
                      placeholder="ArticleContent"
                      value={this.props.articleContent}
                      onChange={this.handleChanged}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Upload Image</Form.Label>
                    <ImageUploader
                      withIcon={true}
                      withPreview={true}
                      buttonText="Choose images"
                      onChange={this.onDrop}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                      singleImage= {true}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add Article
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

CreateArticle.propType ={
    newArticle: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    token: state.token,
    article: state.posts.articles
  })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     newArticle: (article) => {
//       dispatch(newArticle(article));
//     },
//   };
// };

export default connect(mapStateToProps, {newArticle,articleImage})(CreateArticle);

