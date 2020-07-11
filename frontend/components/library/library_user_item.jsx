import React from 'react';
import FollowButton from '../follow_button';
import { withRouter } from 'react-router-dom';

const LibraryUserItem = ({ user, history }) =>  {

  return (
    <div
      className='library-user-item'
      key={`library-user-item-${user.id}`}
    >
      <img
        className='library-user-item-img'
        src={user.imageUrl} alt="library-user"
        onClick={() => history.push(`/${user.profileUrl}`)}
      />
      <div className='library-user-item-name' onClick={() => history.push(`/${user.profileUrl}`)}>{user.displayName}</div>
      <div className='library-user-follow-container'>
        <FollowButton user={user} type='library' />
      </div>
    </div>
  )
}

export default withRouter(LibraryUserItem);