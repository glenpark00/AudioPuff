import React from 'react';
import NavBarAuthContainer from './nav_bar_auth_container';
import { Link } from 'react-router-dom';
import NavBarSiteDropdown from './nav_bar_site_dropdown';
// You'll probably need a container for this to pass whether a user is logged in or not
// For NavBar forms, you should make an outer div for login/signup with upload button as well (will promp the modal to sign in) and make that a AuthRoute, and otherwise have it be a protected route that renders Try Pro Link, upload, user profile show dropdown, notification dropdown,
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='nav-bar'>
        <Link to="/" className='homepage-link'>AudioPuff</Link>
        { !this.props.loggedIn ? <NavBarAuthContainer /> : '' }
        <NavBarSiteDropdown loggedIn={this.props.loggedIn}/>
      </div>
    )
  }
}