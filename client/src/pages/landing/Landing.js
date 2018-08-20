import React, { Component } from 'react';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import * as actions from '../../action/index';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

class Landing extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  renderContent(){
    switch(this.props.user){
      case null:
        return (
          <Dimmer inverted active>
            <Loader active>Loading</Loader>
          </Dimmer>
        );
      case false:
        return <Header />
      default:
        return <Redirect to='/user' />
    }
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return { 
    user : state.user.user
  }
}

export default connect(mapStateToProps, actions)(Landing);
