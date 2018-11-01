import React, { Component } from 'react';
import './NavBar.css';
import { Input, Menu } from 'semantic-ui-react';
import auth0Client from '../../../Auth';
import { NavLink, withRouter } from 'react-router-dom';
import './NavBar.css'



// import Login from "./Login";
// import { Route } from 'react-router-dom';

class NavBar extends Component {
  state = { activeItem: 'home' }

  signOut = (props) => {
    auth0Client.signOut();
    this.props.history.replace('/');
  };

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item
          active={activeItem === 'Dashboard'}
        >
          {
            auth0Client.isAuthenticated() &&
            <NavLink
              className="item"
              to={'/dashboard'}>
              Dashboard
          </NavLink>
          }
        </Menu.Item>
        <Menu.Menu position='right'>
          {
            !auth0Client.isAuthenticated() &&
            <Menu.Item
              className='signIn'
              name='Sign In'
              active={activeItem === 'Sign In'}
              onClick={auth0Client.signIn}
            />
          }
          {
            auth0Client.isAuthenticated() &&
            <Menu.Item
              name={auth0Client.getProfile().name}
            />
          }
          {
            auth0Client.isAuthenticated() &&
            <Menu.Item
              className='signOut'
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.signOut}
            />
          }
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(NavBar)