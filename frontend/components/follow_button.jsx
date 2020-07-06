import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unfollow } from '../util/follows_api_util';
import { fetchUser } from '../actions/users_actions';
import { FaPlus } from 'react-icons/fa';

export default function FollowButton({ user }) {
  const currentUser = useSelector(state => state.entities.users[state.session.currentUserUrl])
  const [followed, setFollowed] = useState(user.followers.includes(currentUser.profileUrl));

  const dispatch = useDispatch();

  useEffect(() => {
    setFollowed(user.followers.includes(currentUser.profileUrl))
  })

  return (
    <div
      className='like-button'
      style={followed ? { color: '#CE1141' } : {}}
      onClick={() => {
        if (followed) {
          unfollow({ userId: user.id, followerId: currentUser.id })
            .then(() => dispatch(fetchUser(user.id)))
        } else {
          follow({ userId: user.id, followerId: currentUser.id })
            .then(() => dispatch(fetchUser(user.id)))
        }
      }}>
      <FaPlus />
      <div className='like-button-text'>
        {followed ? 'Following' : 'Follow'}
      </div>
    </div>
  );
}