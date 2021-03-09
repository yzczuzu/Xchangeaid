import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from "react-redux";
import store from "./store";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Home from './components/Home/Timeline';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile';
import Readmore from './components/Cardboard/Readmore';
import ShowPostDetail from './components/Cardboard/ShowPostDetail';
import ReadmoreActivity from './components/Cardboard/ReadmoreActivity';
import ShowPostActivity from './components/Cardboard/ShowPostActivity';



class App extends React.Component {
  componentDidMount(){
    //store.dispatch(loadUser());
  }
  render() {
    return (
<Provider store={store}>
      <Router>
        <div className="MainContainer clearfix">
            <Header />
            <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/Home" component={Home}></Route>
          <Route exact path="/Login" component={Login}></Route>
          <Route exact path="/Register" component={Register}></Route>
          <Route exact path="/Profile" component={Profile}></Route>
          <Route exact path="/Header" component={Header}></Route>
          <Route exact path="/Readmore/:id" component={ShowPostDetail}></Route>
          <Route exact path="/ReadmoreActivity/:id" component={ShowPostActivity}></Route>
          <Route exact path="/EditReadmore/:id" component={Readmore}></Route>
          <Route exact path="/EditReadmoreActivity/:id" component={ReadmoreActivity}></Route>
        </Switch>         
            <Footer />
        </div>
      </Router>
      </Provider>

    );
  }
}

export default App;
