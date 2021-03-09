import React, { Component } from "react";
import { Container, Row } from 'react-bootstrap';
import "../../App.css";

class Filterby extends Component {
    render() {
        return (
            <Container>
                <Row style={{ marginTop: '10px' }}>
                    <p>Filtered By:  
                    <a href="/">   Activity </a> 
                    <a href="/">   Article </a>
                    </p>
                </Row>
            </Container>
        );
    }
}

export default Filterby;
