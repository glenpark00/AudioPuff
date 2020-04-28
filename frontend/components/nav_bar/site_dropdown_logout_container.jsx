import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'

const SiteDropdownLogout = ({ logout }) => (
  <Link to='/logout' onClick={logout}>Sign out</Link>
)

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(SiteDropdownLogout);