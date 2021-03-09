import React, { Component } from "react";
import {
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import CreateActivity from "../Home/CreateActivity";
import CreateArticle from "../Home/CreateArticle";

class AddPost extends Component {
  state = {
    articles: [],
    deps: [],
    addActivityshow: false,
    addArticleshow: false,
    userId: "",
    first_name: "",
    last_name: "",
    email: "",
  };

  render() {
    let addActivityClose = () => this.setState({ addActivityshow: false });
    let addArticleClose = () => this.setState({ addArticleshow: false });
    return (
      <div style={{ float: "right", marginTop: "10px" }}>
        <DropdownButton id="dropdown-basic-button" title="Add Posts">
          <Dropdown.Item href="#/action-1" onClick={() => this.setState({ addActivityshow: true })}>
            Add Activity
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={() => this.setState({ addArticleshow: true })}>
            Add Article
          </Dropdown.Item>
        </DropdownButton>
        <CreateActivity show={this.state.addActivityshow} onHide={addActivityClose} />
        <CreateArticle show={this.state.addArticleshow} onHide={addArticleClose} />
      </div>
    );
  }
}

export default AddPost;
