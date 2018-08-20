import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../action/index';
import {
  Form,
  Button,
  Grid,
  Header,
  List
} from 'semantic-ui-react';
import InputField from '../../components/Input';
import styles from './styles/index.scss';

class Login extends Component {
  render() {
    return (
      <Grid className={styles.loginForm} columns={2}>
        <Grid.Column className={styles.landing}>
          <div className={styles.content}>
            <Header as='h2' textAlign='left'>
              DEVCONNECTOR
            <Header.Subheader><h3>Connecting other Developers</h3></Header.Subheader>
            </Header>
            <List
              verticalAlign='middle'
              className={styles.list}
            >
              <List.Item className={styles.item}>
                ______________________________________________
              </List.Item>
              <List.Item className={styles.item}>
                Sharing your skills to the other Developers
              </List.Item>
              <List.Item className={styles.item}>
                Build a network for improve you career
              </List.Item>
              <List.Item className={styles.item}>
                Find some new friends
              </List.Item>
            </List>
          </div>
        </Grid.Column>
        <Grid.Column className={styles.form}>
          <Form
            className={styles.formContent}
            onSubmit={this.props.handleSubmit(((values) => this.props.loginUser(values,this.props.history)))}
          >
            <Header as='p'>
              Please login to get started
            </Header>
            <Field
              component={InputField}
              name='email'
              placeholder='user@gmail.com'
              type='email'
              icon='user'
              className={styles.input}
            />
            <Field
              component={InputField}
              name='password'
              placeholder='type your password'
              type='password'
              icon='key'
              className={styles.input}
            />
            <Button positive fluid className={styles.btn} type='submit' >Login</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  };
};

const mapStateToProps = state =>{  
  return {
    user: state.user.user,
    failed: state.user.failed
  }
}

Login = reduxForm({
  form: 'auth'
})(Login);

const connectedLoginToRedux = connect(mapStateToProps, actions)(Login);
export default connectedLoginToRedux;


