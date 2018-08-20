import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import store from './store';
import * as actions from './action/index';
import { LOGIN_USER } from './action/type';
import Landing from './pages/landing/Landing';
import Auth from './pages/auth/Auth';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import Home from './pages/home/Home';
import PrivateRoute from './Routes'; 


if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch({
    type: LOGIN_USER,
    payload: decoded
  })
}

class App extends Component {
  render(){
    return(
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" component={Landing} exact />
            <Route path="/auth" component={Auth} exact />
            <Switch>
              <PrivateRoute path="/user" component={Profile} exact />
            </Switch>
            <Switch>
              <PrivateRoute path="/home" component={Home} exact />
            </Switch>
            <Switch>
              <PrivateRoute path="/user/edit_profile" component={EditProfile} exact />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  };
}

export default connect(null,actions)(App)
