import React from 'react';
import NavBarAuthContainer from './nav_bar_auth_container';
import NavBarProtectedContainer from './nav_bar_protected_container';
import { Link } from 'react-router-dom';
import SiteDropdownButton from './site_dropdown_button';
import SearchBarContainer from '../search/search_bar_container';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className='nav-bar'>
          <div className='nav-left-links'>
            <Link to='/' className='homepage-link nav-bar-item'>A U D I O P U F F</Link>
            <Link to='/' className='nav-left-link'>Home</Link>
            <Link to='/' className='nav-left-link'>Stream</Link>
            <Link to='/' className='nav-left-link'>Library</Link>
          </div>
          <SearchBarContainer />
          {!this.props.loggedIn ? <NavBarAuthContainer /> : <NavBarProtectedContainer />}
          <SiteDropdownButton loggedIn={this.props.loggedIn} />
        </div>
        <div className='phantom-nav-bar'></div>
      </>
    )
  }
}