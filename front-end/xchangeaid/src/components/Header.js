import React, { Component, Fragment } from "react";
import {Navbar,Nav} from 'react-bootstrap';
import {Redirect} from "react-router-dom";

class Header extends Component {
  constructor(){
    super()
    this.state = {
      navigate : false
    };
  }

  
  logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.setState({navigate: true})
    window.location.reload();
  }

  render() {
    const {navigate} = this.state;

    if (navigate) {
      return  <Redirect to ="/Header" push={true}/>
    }
    const loginRegLink = (
      <div className="nav_font_styling" >
      <Nav className="mr-auto">
        <Nav.Item><Nav.Link href="/Login">Login</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/Register">Register</Nav.Link></Nav.Item>
      </Nav>
    </div>)
    
    const userLink = (
      <div className="nav_font_styling" >
    <Nav className="mr-auto">
      <Navbar.Brand href=""></Navbar.Brand>
      <Nav.Item><Nav.Link href="/Profile">Profile</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link href="" onClick={this.logOut.bind(this)}>Logout</Nav.Link></Nav.Item>
    </Nav>
    </div>)

    const loginsuccess = (
      <div className="logo_styling">
          <Navbar.Brand href="/Home">
            <h1>
              <span className="logosize">XchangeAid</span>
            </h1>
          </Navbar.Brand>
        </div>
    )

    const loginfail = (
      <div className="logo_styling">
          <Navbar.Brand href="/Login">
            <h1>
              <span className="logosize">XchangeAid</span>
            </h1>
          </Navbar.Brand>
        </div>
    )

    return (
      <Fragment>
      <Navbar bg="#b8549d" variant="dark">
      {localStorage.usertoken ?  loginsuccess : loginfail}
        {localStorage.usertoken ? userLink : loginRegLink}
      </Navbar>
      </Fragment>
    );
  
  }

}
export default Header;
