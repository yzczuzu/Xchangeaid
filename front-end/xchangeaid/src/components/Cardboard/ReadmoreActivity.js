import React from "react";
import { Form, Container, Button, Image } from 'react-bootstrap';
import './style.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class ReadmoreActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idpost: "",
            activityContent: "",
            activityTitle:"",
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
            axios.put('https://heroku-xchangeaid.herokuapp.com/editActivity/'+ idpost, {
                activityContent: this.state.activityContent
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.history.push('/Home');
              })
        } else {
            axios.put('https://heroku-xchangeaid.herokuapp.com/editActivity/'+ idpost, {
                activityContent: this.state.activityContent
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.history.push('/Home');
              })
        }
        toast.info('Edit Activity Successfully!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1800,
          })
    }

    componentWillMount(){
        this.getPostDetail();
    }

    getPostDetail(){
        let idpost = this.props.match.params.id;
        
        axios.get('https://heroku-xchangeaid.herokuapp.com/getOneActivity/'+ idpost)
         .then(response => {
             this.setState({details: response.data}, () => {
             })
         })
         .catch(err => console.log(err));
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
                         <Form.Label key={detail.activityTitle}>{detail.activityTitle}</Form.Label>
                         ))}
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <h2>Content</h2>
                        {this.state.details.map((detail) => (
                        <Form.Control key={detail.activityContent} name="activityContent" as="textarea" onChange={this.handleChanged} type="text" rows="3">{detail.activityContent}</Form.Control>
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

export default ReadmoreActivity;