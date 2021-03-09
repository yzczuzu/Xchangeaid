import React from "react";
import { Form, Container, Button, Image } from 'react-bootstrap';
import './style.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class ShowPostActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            details: [],
            activityContent: "",
            activityTitle: "",
            userId: "",
            showsButton: false,
            showsAdminButton: false,
            role: ""
            // pictures: []
        };
    }

    componentWillMount() {
        this.getPostDetail();
    }

    getPostDetail() {

        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);

        this.setState({
            userId: decoded.userId,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            role: decoded.role
        })

        let role = decoded.role;
        let user = decoded.userId;
        let idpost = this.props.match.params.id;
    
        axios.get('https://heroku-xchangeaid.herokuapp.com/getOneActivity/' + idpost)
            .then(response => {
                this.setState({ details: response.data }, () => {
                    console.log(this.state.details[0].activityTitle);
                    console.log(this.state.details[0].activityContent);
                    console.log(this.state.details[0].userId);

                    if (this.state.details[0].userId === user) {
                        this.setState({ showsButton: true })
                    }

                    if (role === 0) {
                        this.setState({ showsAdminButton: true })
                    }

                })
            })
            .catch(err => console.log(err));
    }

    onDelete() {
        let idpost = this.props.match.params.id;
        axios.delete('https://heroku-xchangeaid.herokuapp.com/deleteActivity/' + idpost)
            .then(response => {
                this.props.history.push('/Home');
            })
            .catch(err => console.log(err));
            toast.warn('Delete Activity Successfully!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1800,
              })
    }

    onSubmit = () => {
        let idpost = this.props.match.params.id;
        this.props.history.push('/EditReadmoreActivity/' + idpost);
    }

    render() {

        const showsButton = this.state.showsButton;
        const showsAdminButton = this.state.showsAdminButton;
        let buttonedit;
        let buttondelete;
        if (showsButton === true) {
            buttonedit = <Button onClick={this.onSubmit}>Edit</Button>
            buttondelete = <Button variant="danger" onClick={this.onDelete.bind(this)}>Delete</Button>
        }

        if (showsAdminButton === true) {
            buttondelete = <Button variant="danger" onClick={this.onDelete.bind(this)}>Delete</Button>
        }

        return (
            <Container className="main-wrapper" >
                <Form>
                    <Link className="btn grey" to="/Home">Back</Link>
                    <Form.Group>
                        <Image>
                            {/* {this.props.img}  */}
                        </Image>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <h2>Title</h2>
                        {this.state.details.map((detail) => (
                            <Form.Label key={detail.activityTitle}>{detail.activityTitle}</Form.Label>
                        ))}
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <h2>Content</h2>
                        {this.state.details.map((detail) => (
                            <Form.Label key={detail.activityContent}>{detail.activityContent}</Form.Label>
                        ))}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> <h4> Comments </h4> </Form.Label>
                        <Form.Control name="comment" type="text" as="textarea" rows="2" />
                    </Form.Group>

                    {buttonedit}
                    &nbsp;
                    {buttondelete}

                </Form>
            </Container>
        );
    }

}

export default ShowPostActivity;