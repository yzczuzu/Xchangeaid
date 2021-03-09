import React, { Component } from "react";
import {Card} from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Card bg="dark clearfix"> 
          <Card.Footer>@2020 Proep. Proudly created with React and Node.js</Card.Footer>
        </Card>
        </div>
    );
  }
}

export default Footer;
