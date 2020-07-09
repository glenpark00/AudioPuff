import React from 'react';
import NavBarAuth from './nav_bar_auth';
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
              <Link to='/discover' className='homepage-link nav-bar-item'>A U D I O P U F F</Link>
              <Link to='/discover' className={`nav-left-link ${location === '/discover' ? 'link-selected' : ''}`}>Home</Link>
              <Link to='/stream' className={`nav-left-link ${location === '/stream' ? 'link-selected' : ''}`}>Stream</Link>
              <Link to='/you/library' className={`nav-left-link ${location.slice(0, 4) === '/you' ? 'link-selected' : ''}`}>Library</Link>
            </div>
            <SearchBarContainer />
            {!this.props.loggedIn ? <NavBarAuth /> : <NavBarProtectedContainer />}
          </div>
          <div className='nav-bar-space'></div>
        </div>
        <div className='phantom-nav-bar'></div>
      </>
    )
  }
}

export default withRouter(NavBar);