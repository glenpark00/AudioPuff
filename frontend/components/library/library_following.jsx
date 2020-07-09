import React from 'react';
import FollowButton from '../follow_button';
import { withRouter } from 'react-router-dom';

const LibraryFollowing = ({ users, overview, history }) => {
  const openProfile = user => {
    history.push(`/${user.profileUrl}`)
  }

  return (
    <div className='library-following'>
      <div className={overview ? 'library-overview-subheader' : 'library-subheader'}>{overview ? 'Following' : "Hear what the people you follow have posted"}</div>
      <div className='library-content'>
        {users.map(user => {
          return (
            <div 
              className='library-user-item' 
              key={`library-user-item-${user.id}`}
            >
              <img 
                className='library-user-item-img' 
                src={user.imageUrl} alt="library-user"
                onClick={() => openProfile(user)}
              />
              <div className='library-user-item-name' onClick={() => openProfile(user)}>{user.displayName}</div>
              <div className='library-user-follow-container'>
                <FollowButton user={user} type='library' />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default withRouter(LibraryFollowing);