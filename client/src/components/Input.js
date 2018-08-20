import React, { Component } from 'react';
import { Input, Message } from 'semantic-ui-react';

class inputField extends Component {
  renderErrorMessage(touched,error) {
    if (touched && error) {
      return (
        <Message 
          error
          compact
          content={error}
          size='mini'
          style={{ display: 'block', marginBottom: '20px' }}
        />
      )
    }
  }
  render() {
    const { label,className, input, placeholder, meta: { error, touched }, icon, type } = this.props;
    return (
      <div>
        <label style={{ display: 'block' }}><h5>{label}</h5></label>
        <Input
          type={type}
          icon={icon}
          iconPosition='left'
          {...input}
          placeholder={placeholder}
          className={className}
        />
        {this.renderErrorMessage(touched,error)}
      </div>
    )
  }
}

export default inputField;
