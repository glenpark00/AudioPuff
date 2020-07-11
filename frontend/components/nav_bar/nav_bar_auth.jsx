import React from 'react';
import { useDispatch } from 'react-redux';
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
    </>
  )
}
  
export default NavBarAuth;

