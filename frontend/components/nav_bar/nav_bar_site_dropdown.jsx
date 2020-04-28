import React from 'react';
import { Link } from 'react-router-dom';
import SiteDropdownLogoutContainer from './site_dropdown_logout_container';

export default class NavBarSiteDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  render() {
    return (
      <div className='site-dropdown' onClick={e => e.stopPropagation()}>
        <button className='site-dropdown-button' onClick={this.handleClick}>...</button>
        {this.state.showDropdown ?
          <ul className='site-dropdown-ul'>
            <li>
              <Link to='/'>About us</Link>
            </li>
            {this.props.loggedIn ? 
            <li>
              <SiteDropdownLogoutContainer />
            </li>
            : ''}
          </ul>
          : ''}
      </div>
    )
  }
}