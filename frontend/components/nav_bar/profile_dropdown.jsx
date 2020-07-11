import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { FaHeart, FaUserFriends, FaSignOutAlt } from 'react-icons/fa';
import { GiSoundWaves } from 'react-icons/gi';
import { IoIosPerson } from 'react-icons/io';

const ProfileDropdown = ({ currentUser, closeDropdown, logout, history }) => {
  useEffect(() => {
    window.addEventListener('click', closeDropdown);
    return (() => window.removeEventListener('click', closeDropdown))
  })

  return (
    <div className='profile-dropdown-div'>
      <div onClick={() => history.push(`/${currentUser.profileUrl}`)}>
        <div>{<IoIosPerson color='#999' fontSize='15px' />}</div> 
        <div>Profile</div>
      </div>
      <div onClick={() => history.push('/you/likes')}>
        <div>{<FaHeart color='#999' fontSize='15px' />}</div>
        <div>Likes</div> 
      </div>
      <div onClick={() => history.push('/you/following')}>
        <div>{<FaUserFriends color='#999' fontSize='15px' />}</div>    <div>Following</div>
      </div>
      <div onClick={() => history.push('/you/tracks')}>
        <div>{<GiSoundWaves color='rgb(110, 110, 110)' fontSize='15px' />}</div> 
        <div>Tracks</div>
      </div>
      <div onClick={() => {
        logout()
          .then(() => {
            closeDropdown();
            history.push('/discover');
          })
      }}>
        <div>{<FaSignOutAlt color='#999' fontSize='15px' />}</div>
        <div>Sign out</div>  
      </div>
    </div>
  )
}

export default withRouter(ProfileDropdown);