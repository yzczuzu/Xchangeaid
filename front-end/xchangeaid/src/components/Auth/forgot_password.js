import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './style.css';

class forgotpassword extends Component {
    constructor(props){
        super(props);

        this.state = {
            first_name:'',
            last_name:'',
            email:'',
            confirm_email:'',
            password:'',
            phone:'',
            birthday:''       
        }

        this.handleChaged = this.handleChaged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChaged(event) {
       //update the state value 
       this.setState( {
           [event.target.name]: event.target.value

       })
    }

render() {
    return (

        <div className="auth-wrapper">

        <div className="auth-inner">

            <Container>
                <div className="centerdesign">
                    <h1>Registration </h1>
                    <p>To Register please take the time to fill information below </p>

                </div>

                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicTextfname">
                                <Form.Label text-align='left'> First Name</Form.Label>
                                <Form.Control type="text" name="first_name" placeholder="" value= {this.state.first_name}  onChange={this.handleChaged} required />                                        
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formBasicTextlname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="last_name"  placeholder=""  value={this.state.last_name} onChange={this.handleChaged} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email*</Form.Label>
                        <Form.Control type="email" name="email"  placeholder=""  value={this.state.email} onChange={this.handleChaged} required />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmailconfirm">
                        <Form.Label>Confirm Email*</Form.Label>
                        <Form.Control type="email"  name="confirm_email" placeholder="" value={this.state.confirm_email} onChange={this.handleChaged} required />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label> Enter Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder=""  value={this.state.password}onChange={this.handleChaged} required />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicnumber">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" name="phone" placeholder="" value={this.state.phone} onChange={this.handleChaged} required />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formBasicDate">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="date" name="birthday" placeholder=""  value={this.state.birthday} onChange={this.handleChaged} required />
                            </Form.Group>

                        </Col>
                    </Row>

                    <div className="centerdesign">
                        <Button  variant="dark" type="submit" size="lg" block>
                            Continue
                        </Button>
                    </div>
                </Form>

            </Container>
        </div>
    </div>
        );
    }
}
export default forgotpassword;

