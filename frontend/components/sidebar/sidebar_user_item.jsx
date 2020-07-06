import React from 'react';
import FollowButton from '../follow_button';
import { FaUserFriends } from 'react-icons/fa';

const SideBarUserItem = ({ item }) => {
  if (!item) return null;

  return (
    <div className='side-bar-user-item'>
      <div>
        <img className='side-bar-user-img' src={item.imageUrl} alt=""/>
        <div className='side-bar-user-content'>
          <div className='side-bar-user-text'>{item.displayName}</div>
          <div className='side-bar-user-stats'>
            <div>
              <FaUserFriends color='#999'/>
              <div className='side-bar-user-text'>{item.followers.length}</div>
            </div>
          </div>
        </div>
      </div>
      <FollowButton user={item} />
    </div>
  )
}

export default SideBarUserItem;