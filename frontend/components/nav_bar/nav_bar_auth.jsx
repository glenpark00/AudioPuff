import React from 'react';
import { Link } from 'react-router-dom';

const NavBarAuth = ({ enableModalDisplay }) => (
  <>
    <button className='login-button' onClick={ enableModalDisplay }>
      Sign in
    </button>
    <button className='signup-button' onClick={ enableModalDisplay }>
      Create account
    </button>
    <Link to='/upload'>Upload</Link>
  </>
)
  
export default NavBarAuth;

