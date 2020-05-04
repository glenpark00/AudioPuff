import React from 'react';

const NavBarAuth = ({ enableModalDisplay }) => (
  <>
    <button className='login-button' onClick={ enableModalDisplay }>
      Sign in
    </button>
    <button className='signup-button' onClick={ enableModalDisplay }>
      Create account
    </button>
  </>
)
  
export default NavBarAuth;

