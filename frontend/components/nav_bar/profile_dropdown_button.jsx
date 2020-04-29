import React from 'react';

export default class ProfileDropdownButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className='profile-button'>{ this.props.currentUser.displayName }</button>
    )
  }
}