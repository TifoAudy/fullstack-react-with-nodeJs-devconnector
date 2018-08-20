import React, { Component } from 'react';
import Login from './login';
import Register from './register';
import styles from './styles/index.scss';

class Auth extends Component {
  state = {
    show: 'login'
  };
  renderForm(){
    if(this.state.show === 'login') {
      return (
        <Login history={this.props.history} />
      )
    }else{
      return (
        <Register />
      )
    }
  }

  render() {
    return(
      <div className={styles.container}>
        {this.renderForm()}
      </div>
    );
  };
};

export default Auth;
