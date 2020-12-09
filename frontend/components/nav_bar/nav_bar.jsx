import React from 'react';
import NavBarAuth from './nav_bar_auth';
import NavBarProtected from './nav_bar_protected';
import { Link, withRouter } from 'react-router-dom';
import SearchBarContainer from '../search/search_bar_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.smallScreen = window.innerWidth < 600;
    this.mobileLinkClick = this.mobileLinkClick.bind(this);
  }

  mobileLinkClick = e => {
    e.stopPropagation();
    const button = e.currentTarget;
    button.classList.toggle('link-selected');
    const dropdown = document.querySelector('.nav-links-dropdown');
    if (dropdown.style.display === 'flex') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'flex';
      window.addEventListener('click', () => {
        button.classList.toggle('link-selected');
        dropdown.style.display = 'none';
      }, { once: true });
    }
  }

  render() {
    const location = this.props.history.location.pathname;

    return (
      <>
        <div className='nav-bar-container'>
          <div className='nav-bar-space'></div>
          <div className='nav-bar'>
            { this.smallScreen ? (
              <div className='nav-left-links'>
                <Link to='/discover' className='homepage-link nav-bar-item'>A U D I O P U F F</Link>
                <div className='nav-links-button' onClick={this.mobileLinkClick}>
                  Links
                  <div className='nav-links-dropdown' style={{ display: 'none' }}>
                    <Link to='/discover' className={`nav-left-link ${location === '/discover' ? 'link-selected' : ''}`}>Home</Link>
                    <Link to='/stream' className={`nav-left-link ${location === '/stream' ? 'link-selected' : ''}`}>Stream</Link>
                    <Link to='/you/library' className={`nav-left-link ${location.slice(0, 4) === '/you' ? 'link-selected' : ''}`}>Library</Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className='nav-left-links'>
                <Link to='/discover' className='homepage-link nav-bar-item'>A U D I O P U F F</Link>
                <Link to='/discover' className={`nav-left-link ${location === '/discover' ? 'link-selected' : ''}`}>Home</Link>
                <Link to='/stream' className={`nav-left-link ${location === '/stream' ? 'link-selected' : ''}`}>Stream</Link>
                <Link to='/you/library' className={`nav-left-link ${location.slice(0, 4) === '/you' ? 'link-selected' : ''}`}>Library</Link>
              </div>
            )}
            <SearchBarContainer />
            {!this.props.loggedIn ? <NavBarAuth /> : <NavBarProtected />}
          </div>
          <div className='nav-bar-space'></div>
        </div>
        <div className='phantom-nav-bar'></div>
      </>
    )
  }
}

export default withRouter(NavBar);