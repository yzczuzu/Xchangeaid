import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './style.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/loginAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Register extends Component {
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

    componentDidUpdate(prevProps){
        const {error} = this.props;
        if(error !== prevProps.error){
            //Check for register error
            if(error.id === "REGISTER_FAIL"){
                this.setState({msg:error})
                console.log("error");
            }else{
                this.setState({msg: null});
                console.log("no error");
            }
        }
    }

    handleChaged(event) {
       //update the state value 
       this.setState( {
           [event.target.name]: event.target.value

       })
    }

    handleSubmit(event){
        console.log("form submitted ");
        //call Api to database
        event.preventDefault();

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            birthday: this.state.birthday
        }

        this.props.register(user).then(res => {
                this.props.history.push('/Login')
        })
        
        .catch(err => {
            console.log(err)
        })
        toast.success('Register Successfully!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1800,
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
                                <Button  variant="primary" type="submit" size="lg" block>
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

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  })

export default connect(mapStateToProps,{register})(Register);