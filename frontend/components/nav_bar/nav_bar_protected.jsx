import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProfileDropdownButton from './profile_dropdown_button';
import SiteDropdownButton from './site_dropdown_button';

const NavBarProtected = ({ currentUser, fetchUser, history }) => (
  <>
    <Link to='/upload' className={`nav-right-link ${history.location.pathname === '/upload' ? 'link-selected' : ''}`}>Upload</Link>
    <ProfileDropdownButton currentUser={currentUser} fetchUser={fetchUser} />
    <SiteDropdownButton loggedIn={true} />
  </>
)

export default withRouter(NavBarProtected);