import React from 'react';
import NavBarAuthContainer from './nav_bar_auth_container';
import NavBarProtectedContainer from './nav_bar_protected_container';
import { Link } from 'react-router-dom';
import SiteDropdownButton from './site_dropdown_button';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className='nav-bar'>
          <Link to="/discover" className='homepage-link nav-bar-item'>A U D I O P U F F</Link>
          {!this.props.loggedIn ? <NavBarAuthContainer /> : <NavBarProtectedContainer />}
          <SiteDropdownButton loggedIn={this.props.loggedIn} />
        </div>
        <div className='phantom-nav-bar'></div>
      </>
    )
  }
}