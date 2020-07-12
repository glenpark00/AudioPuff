import React from 'react';
import { withRouter } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
import { GiSoundWaves } from 'react-icons/gi';
import FollowButton from '../follow_button';

const SearchUserItem = ({ user, history }) => {
  const openUserShow = () => {
    history.push(`/${user.profileUrl}`)
  }

  return (
    <div className='user-display-item'>
      <img className='user-display-image' src={user.imageUrl} alt="user-image" onClick={openUserShow}/>
      <div className='user-display-info'>
        <div onClick={openUserShow}>{user.displayName}</div>
        <div>{user.city} / {user.country}</div>
        <div className='side-bar-user-stats'>
          <div>
            <FaUserFriends color='#999' />
            <div className='side-bar-stats-text'>{user.followers.length}</div>
          </div>
          <div>
            <GiSoundWaves color='#999' fontSize='25px' />
            <div className='side-bar-stats-text'>{user.songs.length}</div>
          </div>
        </div>
        <div className='search-user-follow-container'>
          <FollowButton user={user} type='search-results' />
        </div>
      </div>
    </div>
  )
}

export default withRouter(SearchUserItem);