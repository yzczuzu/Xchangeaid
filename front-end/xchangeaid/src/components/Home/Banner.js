import React, { Component } from "react";
import { Container, Row, Image} from 'react-bootstrap';
import timeLinePic from './timeLinePic.png'


class Banner extends Component {
    render() {
        return (
            <Container>
                <Row style={{marginTop: "20px"}}>
                        <Image src={timeLinePic} fluid/>
                </Row>
            </Container>
        );
    }
}
export default Banner;
