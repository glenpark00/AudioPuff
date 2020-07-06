import React from 'react';
import NavBarAuthContainer from './nav_bar_auth_container';
import NavBarProtectedContainer from './nav_bar_protected_container';
import { Link, withRouter } from 'react-router-dom';
import SearchBarContainer from '../search/search_bar_container';

class NavBar extends React.Component {
  render() {
    const location = this.props.history.location.pathname;

    return (
      <>
        <div className='nav-bar-container'>
          <div className='nav-bar-space'></div>
          <div className='nav-bar'>
            <div className='nav-left-links'>
              <Link to='/' className='homepage-link nav-bar-item'>A U D I O P U F F</Link>
              <Link to='/' className={`nav-left-link ${location === '/' ? 'link-selected' : ''}`}>Home</Link>
              <Link to='/' className='nav-left-link'>Stream</Link>
              <Link to='/' className='nav-left-link'>Library</Link>
            </div>
            <SearchBarContainer />
            {!this.props.loggedIn ? <NavBarAuthContainer /> : <NavBarProtectedContainer />}
          </div>
          <div className='nav-bar-space'></div>
        </div>
        <div className='phantom-nav-bar'></div>
      </>
    )
  }
}

export default withRouter(NavBar);