import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import styles from './LeftBar.scss';
import { connect } from 'react-redux';
import * as actions from '../action/index';
import { withRouter } from 'react-router-dom';

class LeftBar extends Component {
  handleItemClick = (e, { name }) => {
    e.preventDefault();

    this.props.history.push(`/${name}`)
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Sidebar
          as={Menu}
          vertical
          visible
          className={styles.sidebar}
          inverted
        >
          <Menu.Item>
            <h3>NGOPI.MEN</h3>
          </Menu.Item>
          <Menu.Item
            name='user'
            active={this.props.currentPage === 'Profile'}
            onClick={this.handleItemClick}
          >
            <div>
              <Icon size='large' name='user circle' />
              Profile
            </div>
          </Menu.Item>
          <Menu.Item
            name='home'
            active={this.props.currentPage === 'Home'}
            onClick={this.handleItemClick}
          >
            <div>
              <Icon size='large' name='home' />
              Home
            </div>
          </Menu.Item>
          <Menu.Item
            name='settings'
            active={this.props.currentPage === 'Settings'}
            onClick={this.handleItemClick}
          >
            <div>
              <Icon size='large' name='settings' />
              Settings
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => this.props.logoutUser()}
            as='a'
            href="/api/logout"
          >
            <div>
              <Icon size='large' name='outdent' />
              Logout
            </div>
          </Menu.Item>
        </Sidebar>
      </div>
    );
  };
};

export default connect(null, actions)(withRouter(LeftBar));
