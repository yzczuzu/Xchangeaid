import { Form,Card, Row, Col, Image, Button, Container } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { BsHeartFill } from "react-icons/bs";

//Title,Content,Image,DateTime,AdminId,UserId,Likes
const Cardboard = (props) => {
  let link = '';
  if (props.idpost == null) {
    link = <Link to={'./ReadmoreActivity/'+ props.activityId}>
                  <span>Read more...</span>
                </Link>
  } else {
    link = <Link to={'./Readmore/'+ props.idpost}>
                  <span>Read more...</span>
                </Link>
  }
  return (

    <Container className="main-wrapper">
      <Card className='card-wrap'>
        <Form>
          <Card.Header className="header-meta">
            <Row>
              <Col >
                <Image src={props.img} roundedCircle />
                <p className="info">
                 {props.username}
              </p>
              </Col>
              <Col >
                <Button className="pull-xs-right">
                  <BsHeartFill />  {'likes#'}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="info">
                <span className="date">
                  {props.date}
                </span>
              </Col>
            </Row>
          </Card.Header>

          <Card.Img variation='top' src={props.img} />

          <Card.Title className='title-font' >
            {props.title}
          </Card.Title>

          <Card.Body>
            <Card.Text  name="content">  {props.content}  </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col>
                {link}
                </Col>
              <Col>
              </Col>
            </Row>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  );
};


export default Cardboard;
