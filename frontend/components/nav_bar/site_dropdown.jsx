import React from 'react';
import { Link } from 'react-router-dom';
import SiteDropdownLogoutContainer from './site_dropdown_logout_container';

export default class SiteDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('click', this.props.closeDropdown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.props.closeDropdown);
  }

  render() {
    return (
      <div className='site-dropdown-div'>
        <Link to='/' onClick={ this.props.closeDropdown }>About us</Link>
        {this.props.loggedIn ?
          <SiteDropdownLogoutContainer closeDropdown={ this.props.closeDropdown } />
          : ''}
      </div>
    )
  }
}