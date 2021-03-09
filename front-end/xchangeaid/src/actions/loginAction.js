import {returnErrors} from './errorAction';
import axios from 'axios';
import {
    USER_LOADING,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
  } from './types';

  // check token & load user
export const loadUser =  () => (dispatch) => {
    //user loading
    dispatch({type: USER_LOADING});
  
    axios.get('https://heroku-xchangeaid.herokuapp.com/users/Login')
    .then(res => dispatch({
        type: USER_LOADING,
        payload: res.data,
    }))
    .catch(err => {
    //    dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
}
export const register = (newUser) => (dispatch) => {
    return axios
    .post('https://heroku-xchangeaid.herokuapp.com/users/Register',  {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        birthday: newUser.birthday
    })
    .then((user) =>
        dispatch({
            type: REGISTER_SUCCESS,
            payload: user.data
        },
        () =>console.log("Registered")
    )
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status,'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

export const login = (userEmail,userPassword) => (dispatch) => {
    return axios
    .post('https://heroku-xchangeaid.herokuapp.com/users/Login',{
        email: userEmail,
        password: userPassword
    })
    // .then((user) => 
    // dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: user.data
    // }),
    // )
    .then(res =>{
       localStorage.setItem('usertoken',res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

//Setup config/headers and token
export const tokenConfig = getState =>{
      //getToken from localstorage
      const token = getState().auth.token; // getState is not a function
      console.log(token);
      //headers
      const config = {
          headers:{
              "Content-type": "application/json"
          }
      }
      // if token, add to headers
      if(token){
          config.headers['x-auth-token'] = token;
      }

      return config;
}
