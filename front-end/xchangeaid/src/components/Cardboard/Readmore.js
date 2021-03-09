import React from "react";
import { Form, Container, Button, Image } from 'react-bootstrap';
import './style.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class Readmore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idpost: "",
            articleContent: "",
            articleTitle:"",
            comment:"",
            details:[],
            // pictures: []
          };

          this.handleChanged = this.handleChanged.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleChanged(event) {
        //update the state value
        this.setState({
          [event.target.name]: event.target.value,
        });
      }

    handleSubmit(event) {
        console.log("article edited");
        //call Api to database
        event.preventDefault();
        //get idpost from URL
        let idpost = this.props.match.params.id;
        console.log(idpost);
        if (idpost !== 0) {
            axios.put('https://heroku-xchangeaid.herokuapp.com/editArticle/'+ idpost, {
                articleContent: this.state.articleContent
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.history.push('/Home');
              })
        } else {
            axios.put('https://heroku-xchangeaid.herokuapp.com/editActivity/'+ idpost, {
                articleContent: this.state.articleContent
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.history.push('/Home');
              })
        }
        toast.info('Edit Article Successfully!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1800,
          })

    }

    componentWillMount(){
        this.getPostDetail();
    }

    getPostDetail(){
        let idpost = this.props.match.params.id;
        
        axios.get('https://heroku-xchangeaid.herokuapp.com/getOneArticle/'+ idpost)
         .then(response => {
             this.setState({details: response.data}, () => {
                 console.log(this.state.details[0].articleTitle);
                 console.log(this.state.details[0].articleContent);
                //console.log(detail.state.articleTitle);
             })
         })
         .catch(err => console.log(err));
         console.log(this.state.details.articleContent);
    }
     
    render() {

        return (
            <Container className="main-wrapper" >       
                  <Form onSubmit={this.handleSubmit}>
                      <Link className="btn grey" to="/Home">Back</Link>
                    <Form.Group>
                        <Image>
                            {/* {this.props.img}  */}
                        </Image>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <h2>Title</h2>
                        {this.state.details.map((detail) => (
                         <Form.Label key={detail.articleTitle}>{detail.articleTitle}</Form.Label>
                         ))}
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <h2>Content</h2>
                        {this.state.details.map((detail) => (
                        <Form.Control key={detail.articleContent} name="articleContent" as="textarea" onChange={this.handleChanged} type="text" rows="3">{detail.articleContent}</Form.Control>
                        ))}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> <h4> Comments </h4> </Form.Label>
                        <Form.Control name="comment" type="text" as="textarea" rows="2"  />
                    </Form.Group>
                    
                  <Button variant="info" type="submit">Edit</Button>
                </Form>  
            </Container>
        );
    }

}

export default Readmore;