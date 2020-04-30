import React from 'react';

export default class ProfileDropdownButton extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  render() {
    return (
      <button className='profile-button'>{ this.props.currentUser.displayName }</button>
    )
  }
}