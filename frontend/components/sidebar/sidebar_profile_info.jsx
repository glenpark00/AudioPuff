import React from 'react';
import { withRouter } from 'react-router-dom';

const SideBarProfileInfo = ({ user }) => {
  if (!user.followings || !user.songs) return null;

  const count = (text, value) => (
    <div className='profile-counter'>
      <div>{text}</div>
      <div>{value}</div>
    </div>
  )

  return (
    <div>
      <div className='side-bar-profile-info'>
        { count('Followers', user.followers.length) }
        { count('Following', user.followings.length) }
        { count('Tracks', user.songs.length) }
      </div>
      <div className='side-bar-profile-bio'>{user.bio}</div>
    </div>
  )
}

export default withRouter(SideBarProfileInfo);