import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import './style.css';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/loginAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.handleChaged = this.handleChaged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
  

    handleChaged(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event){
        console.log("form submitted ");
        //call Api to database
        event.preventDefault();
        this.props.login(this.state.email,this.state.password).then(res =>{
            this.props.history.push('/Home');
            window.location.reload();
        });
        // const user = {
        //     email: this.state.email,
        //     password: this.state.password
        // }
   
        // login(this.props.user).then(res => {
           
        // })

        // .catch(err => {
        //     console.log(err)
        // })
    }
    
    render() {
        return (
            
            <div className="auth-wrapper">

                <div className="auth-inner">

                        <div className="centerdesign">
                            <h1>Login</h1>
                            <p> To view information please login </p>
                        </div>

                        <Form noValidate onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email*</Form.Label>
                                
                                <Form.Control 
                                type="email" 
                                placeholder="Enter Email"
                                name="email"
                                value= {this.state.email}
                                onChange={this.handleChaged} />

                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label> Enter Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Enter Password" 
                                name="password"
                                value= {this.state.password}
                                onChange={this.handleChaged} />
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>

                            <div className="centerdesign">
                                <Button variant="primary" type="submit" size="lg" block>
                                    Submit
                                </Button>
                            </div>
                            <br></br>
                            <p className="forgot-password text-right">
                                Forgot <a href="./forgot_password.js">password?</a>  
                            </p>

                        </Form>
                </div>
            </div>

        );
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  })

export default connect(mapStateToProps,{login})(Login);