import React from 'react';
import { Link } from 'react-router-dom';

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
    const { closeDropdown, logout } = this.props;
    return (
      <div className='site-dropdown-div'>
        <Link to='/' onClick={ closeDropdown }>About us</Link>
        {this.props.loggedIn ?
          <Link to='/logout' onClick={() => {
            logout();
            closeDropdown();
          }}>Sign out</Link>
          : ''}
      </div>
    )
  }
}