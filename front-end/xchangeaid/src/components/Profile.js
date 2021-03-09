import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Container, Card, Table } from 'react-bootstrap';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            userId: '',
            first_name: '',
            last_name: '',
            email: ''
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken

        if(token == null)
        {
            this.props.history.push('/Login')
            alert("Please Login first")
        }
        else{
            const decoded = jwt_decode(token)

            this.setState({
                userId: decoded.userId,
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                email: decoded.email
            })
        }
    }

    render() {

        return (
            <Container className="auth-wrapper">

                <Container className="auth-inner">
                    <Card.Header className="header-meta">

                        <h1 className="text-center">PROFILE</h1>

                    </Card.Header>

                    <Card.Body>
                        <Table className="table col-md-6 mx-auto">
                            <tbody>
                                <tr>
                                    <td>UserId</td>
                                    <td>{this.state.userId}</td>
                                </tr>
                                <tr>
                                    <td>Firstname</td>
                                    <td>{this.state.first_name}</td>
                                </tr>
                                <tr>
                                    <td>Lastname</td>
                                    <td>{this.state.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.email}</td>
                                </tr>
                            </tbody>

                        </Table>

                    </Card.Body>
                </Container>
            </Container>

        );

    }
}

export default Profile