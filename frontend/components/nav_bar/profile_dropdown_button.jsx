import React, { useState, useEffect } from 'react';
import ProfileDropdown from './profile_dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUser } from '../../actions/users_actions';
import { MdKeyboardArrowDown } from 'react-icons/md';

const ProfileDropdownButton = () => {
  const [showDropdown, setShowDropdown] = useState(false),
    currentUser = useSelector(state => state.entities.users[state.session.currentUser.profileUrl]),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(currentUser.id));
  }, [])

  return (
      <div className={`profile-button ${showDropdown ? 'link-selected' : ''}`} onClick={() => setShowDropdown(true)}>
        <img src={currentUser.imageUrl}/> 
        <div stlye={showDropdown ? { color: 'white' } : {}}>
        <div className='profile-button-text'>
          <div>{currentUser.displayName}</div>
          <div>{<MdKeyboardArrowDown fontSize='15px' />}</div>
        </div>
        </div>
        {showDropdown ?
          <ProfileDropdown
            closeDropdown={() => setShowDropdown(false)}
            currentUser={currentUser}
            logout={() => dispatch(logout())} />
          : null
        }
      </div>
  )
}

export default ProfileDropdownButton;