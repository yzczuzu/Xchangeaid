import React, { Component } from "react";
import Timeline from './Timeline'
import { Container } from 'react-bootstrap';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
        <Container>
        <Timeline/>
        </Container>
        );
    }
}
 
export default Home;