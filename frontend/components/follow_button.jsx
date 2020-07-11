import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unfollow } from '../util/follows_api_util';
import { fetchUser, fetchUserSongs } from '../actions/users_actions';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';

export default function FollowButton({ user }) {
  const currentUser = useSelector(state => state.session.currentUser ? state.entities.users[state.session.currentUser.profileUrl] : {})
  const [followed, setFollowed] = useState(user.followers.includes(currentUser.profileUrl));

  const dispatch = useDispatch();

  useEffect(() => {
    setFollowed(user.followers.includes(currentUser.profileUrl))
  })

  if (user.id === currentUser.id) return null;

  return (
    <div
      className='follow-button'
      style={followed ? { color: '#CE1141', borderColor: '#CE1141' } : {}}
      onClick={() => {
        if (currentUser.id) {
          if (followed) {
            unfollow({ userId: user.id, followerId: currentUser.id })
              .then(() => dispatch(fetchUserSongs(currentUser.profileUrl)))
              .then(() => dispatch(fetchUserSongs(user.profileUrl)))
          } else {
            follow({ userId: user.id, followerId: currentUser.id })
              .then(() => dispatch(fetchUserSongs(currentUser.profileUrl)))
              .then(() => dispatch(fetchUserSongs(user.profileUrl)))
            }
        }
      }}>
      {followed ? <FaUserCheck/> : <FaUserPlus />}
      <div className='follow-button-text'>
        {followed ? 'Following' : 'Follow'}
      </div>
    </div>
  );
}