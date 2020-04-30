import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdownButton from './profile_dropdown_button';

const NavBarProtected = ({ currentUser, fetchUser }) => (
  <>
    <Link to='/trypro'>Try Pro</Link>
    <Link to='/upload'>Upload</Link>
    <ProfileDropdownButton currentUser={currentUser} fetchUser={fetchUser} />
  </>
)

export default NavBarProtected;