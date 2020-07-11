import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProfileDropdownButton from './profile_dropdown_button';

const NavBarProtected = ({ history }) => (
  <>
    <Link to='/upload' className={`nav-right-link ${history.location.pathname === '/upload' ? 'link-selected' : ''}`}>Upload</Link>
    <ProfileDropdownButton />
  </>
)

export default withRouter(NavBarProtected);