import { FETCH_ARTICLES, NEW_ARTICLE, NEW_ACTIVITY, FETCH_ACTIVITY, CREATE_IMAGE } from "./types";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const fetchArticles = () => (dispatch) => {
  fetch("https://heroku-xchangeaid.herokuapp.com/getArticle")
    .then((res) => res.json())
    .then((articles) =>
      dispatch(
        {
          type: FETCH_ARTICLES,
          payload: articles,
        },
        () => console.log("articles fetched..", articles)
      )
    )
    .catch((err) => console.error(err));
};

export const newArticle = (article) => (dispatch) => {
  return axios
  .post('https://heroku-xchangeaid.herokuapp.com/postArticle',{ // add article.img
      userId: article.userId,
      articleContent: article.articleContent,
      articleTitle: article.articleTitle,
      img : article.img,
      likes: 5
  })
  .then(article => 
    dispatch(
        {
          type: NEW_ARTICLE,
          payload: article,
        },
        console.log("Posted //article :"+article)
      
    ),
    toast('Add Article Successfully!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1800,
    })
  )
};

export const articleImage = (article) => (dispatch) => {
  return axios
  .put('https://heroku-xchangeaid.herokuapp.com/addImageArticle', article.img)
  .then(article => 
    dispatch(
        {
          type: CREATE_IMAGE,
          payload: article,
        },
        console.log("Posted //Image :"+article)
    )
  )
};

export const activityImage = (activity) => (dispatch) => {
  return axios
  .put('https://heroku-xchangeaid.herokuapp.com/addImageActivity', activity.img)
  .then(activity => 
    dispatch(
        {
          type: CREATE_IMAGE,
          payload: activity,
        },
    )
  )
};


export const fetchActivity = () => (dispatch) => {
  fetch("https://heroku-xchangeaid.herokuapp.com/getActivity")
    .then((res) => res.json())
    .then((activity) =>
      dispatch(
        {
          type: FETCH_ACTIVITY,
          payload: activity,
        },
        () => console.log("activity fetched..", activity)
      )
    )
    .catch((err) => console.error(err));
};

export const newActivity = (activity) => (dispatch) => {
  return axios
  .post('https://heroku-xchangeaid.herokuapp.com/postActivity', {
      userId: activity.userId,
      activityContent: activity.activityContent,
      activityTitle: activity.activityTitle,
      location: activity.location,
      activityDatetime: activity.activityDatetime,
      likes: 0,
  })
  .then(activity => 
    dispatch(
        {
          type: NEW_ACTIVITY,
          payload: activity,
        },
        console.log("Posted //activity :"+activity)
    ),
    toast('Add Activity Successfully!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1800,
    })
  )
};


// export const edit = (EditDeleteArticle) => (dispatch) => {
//   return axios
//   .put('http://localhost:8080/editArticle/'+ 50 +'/', {
//       articleContent: EditDeleteArticle.articleContent,
//   })
//   .then(article => 
//     dispatch(
//         {
//           type: EDIT_ARTICLES,
//           payload: article,
//         },
//         console.log("Posted"+"//article :"+article)
//     )
//   )
// };

// export const edit = edituser => {
//   console.log("------------------------"+edituser.idpost);
//   console.log(edituser.articleContent);
//   return axios
//   .put('http://localhost:8080/editArticle',{
//      idpost:50,
//      articleContent: "oieoirhg"
//   })
//   .then(res => {
//     console.log("Edited")
//   })
// }