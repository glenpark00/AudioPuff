import React from 'react';

export default class ProfileUserHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <div className='profile-header'>
        <img src={ user.imageUrl ? user.imageUrl : null } />
        <div className='header-display-name'>{ user.displayName }</div>
        { user.firstName && user.lastName ?
          <div className='header-real-name'>{`${user.firstName} ${user.lastName}`}</div>
          : ''
        }
        { user.city && user.country ?
          <div className='header-location'>{`${user.city}, ${user.country}`}</div>
          : ''
        }
      </div>
    )
  }
}