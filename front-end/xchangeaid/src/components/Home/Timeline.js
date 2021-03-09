import React, { Component } from "react";
import Article from "../Cardboard/Article";
import Activity from "../Cardboard/Activity";
import { Container, CardDeck } from 'react-bootstrap';
import "../../App.css";
import Banner from "./Banner";
import Filterby from "./Filterby";
import AddPost from './AddPost';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchArticles,fetchActivity} from '../../actions/postActions';
import PropTypes from 'prop-types';

class Timeline extends Component {
  componentDidUpdate(nextProps){
    if(nextProps.newArticle){
      this.props.fetchArticles();
    }

  }

  componentDidMount() {
    const token = localStorage.usertoken

    if(token == null)
    {
        this.props.history.push('/Login')
    }else{
      this.props.fetchArticles();
      this.props.fetchActivity();
    }
}

 getUserName =(userId) => {
  let name = "username";
  axios.get('https://heroku-xchangeaid.herokuapp.com/users/getOneUser/'+ userId)
 .then(res => (name = res.data[0].first_name)
 )
 .catch(err => console.log(err));
  console.log(name);
 return name;
}


// setArticles = () => {
// }

// setActivity = () => {
 
    
// }


  render() {

    const activityItems = this.props.activities.map(activity =>
      <Activity username={activity.userId} img={'https://heroku-xchangeaid.herokuapp.com/'+activity.img} date={"Activity Date :"+activity.activityDatetime} title={activity.activityTitle} content={activity.activityContent} userid={activity.userId} activityId={activity.activityId}/>
      )
    const postItems = this.props.articles.map(article =>
      <Article username={article.userId} img={'https://heroku-xchangeaid.herokuapp.com/'+article.img} title={article.articleTitle} content={article.articleContent} userid={article.userId} idpost={article.idpost}/>)
    return (
      <Container>
        <Banner />
        <AddPost/>
        <Filterby />

        <Container className='line-style'>
        <h1>Article</h1>
          <CardDeck>
            {postItems}
          </CardDeck>
        <h1>Activity</h1>
          <CardDeck>
            {activityItems}
          </CardDeck>

        </Container>
      </Container>
    );
  }
}

Timeline.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  fetchActivity: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  articles: state.posts.articles,
  activities: state.posts.activities,
})

export default connect(mapStateToProps,{fetchArticles,fetchActivity})(Timeline);