import React from 'react';
import { useDispatch } from 'react-redux';
import SiteDropdownButton from './site_dropdown_button';
import { enableModalDisplay } from '../../actions/ui_actions';

const NavBarAuth = () => {
  const dispatch = useDispatch();

  const openModal = () => dispatch((enableModalDisplay({ type: 'session' })));

  return (
    <>
      <button className='login-button' onClick={openModal}>
        Sign in
      </button>
      <button className='signup-button' onClick={openModal}>
        Create account
      </button>
      <SiteDropdownButton loggedIn={false} />
    </>
  )
}
  
export default NavBarAuth;

