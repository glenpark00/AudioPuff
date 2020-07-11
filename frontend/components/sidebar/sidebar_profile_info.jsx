import React from 'react';
import { withRouter } from 'react-router-dom';

const SideBarProfileInfo = ({ user, currentUser, history }) => {
  if (!user.followings || !user.songs) return null;

  const count = (text, value) => (
    <div className='profile-counter'>
      <div>{text}</div>
      <div>{value}</div>
    </div>
  )

  const openLibrary = url => {
    if (currentUser === user.profileUrl) {
      history.push(`/you/${url}`);
    } else {
      history.push(`/${user.profileUrl}/${url}`)
    }
  }

  return (
    <div className='side-bar-profile-info-container'>
      <div className='side-bar-profile-info'>
        <div onClick={() => openLibrary('followers')}>{count('Followers', user.followers.length)}</div>
        <div onClick={() => openLibrary('following')}>{count('Following', user.followings.length)}</div>
        <div onClick={() => openLibrary('tracks')}>{count('Tracks', user.songs.length)}</div>
      </div>
      <div className='side-bar-profile-bio'>{user.bio}</div>
    </div>
  )
}

export default withRouter(SideBarProfileInfo);