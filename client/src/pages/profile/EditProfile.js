import React, { Component } from 'react';

import LeftBar from '../../components/LeftBar';
import Input from '../../components/Input';
import DropdownOptions from '../../components/DropdownOptions';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../action/index';
import { Form, Button, Dropdown } from 'semantic-ui-react';

import styles from './styles/editProfile.scss';

class EditProfile extends Component {
  state = {
    skills: this.props.location.state.skills
  }
  handleEditProfile = (values) => {
    values.skills = this.state.skills;
    console.log('clicked')
    this.props.editProfile(values,this.props.history);
  }
  handleDropdown = (e, { value }) => {
    e.preventDefault();

    this.setState({ skills: value })
  }
  renderLabel = label => ({
    color: 'blue',
    content: `${label.text}`
  })

  render() {
    return (
      <div>
        <LeftBar />
        <div className={styles.container}>
          <Form error onSubmit={this.props.handleSubmit((values) => this.handleEditProfile(values))} className={styles.form}>
            <Field
              name='name'
              placeholder='type your new username'
              component={Input}
              type='text'
              icon='user'
              label='Name'
              className={styles.input}
            />
            <Field
              name='bio'
              placeholder='type your new bio'
              component={Input}
              type='text'
              icon='book'
              label='Bio'
              className={styles.input}
            />
            <Field
              name='status'
              placeholder='type your new status'
              component={Input}
              type='text'
              icon='heart'
              label='Status'
              className={styles.input}
            />
            <Field
              name='company'
              placeholder='type your new company'
              component={Input}
              type='text'
              icon='building'
              label='Company'
              className={styles.input}
            />
            <label><h5>Skills</h5></label>
            <Dropdown
              options={DropdownOptions}
              basic
              selection
              multiple
              defaultValue={this.state.skills}
              className={styles.input}
              style={{ display: 'block' }}
              onChange={this.handleDropdown}
              renderLabel={this.renderLabel}
            />
            <Button color='purple' type='submit'>Submit</Button>
          </Form>
        </div>
      </div>
    );
  };
};

const validate = (values) => {
  const errors = {};
  errors.name = !(values.name)? 'Username cannot be empty':''

  return errors;
}

EditProfile = reduxForm({
  form: 'editProfile',
  validate
})(EditProfile);

const connectedEditProfileToRedux = connect(null, actions)(EditProfile);
export default connectedEditProfileToRedux
