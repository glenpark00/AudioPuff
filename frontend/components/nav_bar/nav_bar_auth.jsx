import React from 'react';
import SiteDropdownButton from './site_dropdown_button';

const NavBarAuth = ({ enableModalDisplay }) => (
  <>
    <button className='login-button' onClick={ enableModalDisplay }>
      Sign in
    </button>
    <button className='signup-button' onClick={ enableModalDisplay }>
      Create account
    </button>
    <SiteDropdownButton loggedIn={false} />
  </>
)
  
export default NavBarAuth;

