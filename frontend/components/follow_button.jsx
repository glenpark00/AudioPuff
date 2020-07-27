import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unfollow } from '../util/follows_api_util';
import { fetchUser, fetchUserSongs } from '../actions/users_actions';
import { enableModalDisplay } from '../actions/ui_actions';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';

const FollowButton = ({ user }) => {
  const currentUser = useSelector(state => state.session.currentUser ? state.entities.users[state.session.currentUser.profileUrl] : {});
  const [followed, setFollowed] = useState(user.followers ? user.followers.includes(currentUser.profileUrl) : false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user.followers) {
  //     setFollowed(user.followers.includes(currentUser.profileUrl))
  //   }
  // }, [currentUser, user.followers])

  if (user.id === currentUser.id) return null;

  const openModal = () => dispatch((enableModalDisplay({ type: 'session' })));
  
  return (
    <div
      className='follow-button'
      style={followed ? { color: '#CE1141', borderColor: '#CE1141' } : {}}
      onClick={() => {
        if (currentUser.id) {
          if (followed) {
            unfollow({ userId: user.id, followerId: currentUser.id })
              .then(() => {
                // dispatch(fetchUser(user.id))
                // dispatch(fetchUser(currentUser.id))
                dispatch(fetchUserSongs(user.profileUrl))
                dispatch(fetchUserSongs(currentUser.profileUrl))
              })
              .then(() => setFollowed(false))
          } else {
            follow({ userId: user.id, followerId: currentUser.id })
              .then(() => {
                // dispatch(fetchUser(user.id))
                // dispatch(fetchUser(currentUser.id))
                dispatch(fetchUserSongs(user.profileUrl))
                dispatch(fetchUserSongs(currentUser.profileUrl))
              })
              .then(() => setFollowed(true))
            }
        } else {
          openModal()
        }
      }}>
      {followed ? <FaUserCheck/> : <FaUserPlus />}
      <div className='follow-button-text'>
        {followed ? 'Following' : 'Follow'}
      </div>
    </div>
  );
}

export default FollowButton;