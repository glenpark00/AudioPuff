import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { like, unlike } from '../util/likes_api_util';
import { fetchUserSongs } from '../actions/users_actions';
import { fetchSongFromUrl } from '../actions/songs_actions';
import { FaHeart } from 'react-icons/fa';

export default function LikeButton({ song, text }) {
  const currentUser = useSelector(state => state.entities.users[state.session.currentUserUrl]) || {}; 
  const [liked, setLiked] = useState(song.likers.includes(currentUser.profileUrl));
  const dispatch = useDispatch();

  useEffect(() => {
    setLiked(song.likers.includes(currentUser.profileUrl))
  })

  return (
    <div
      className='like-button'
      style={liked ? { color: '#CE1141' } : {}}
      onClick={() => {
        if (currentUser.id) {
          if (liked) {
            unlike({ userId: currentUser.id, songId: song.id })
              .then(() => dispatch(fetchSongFromUrl(song.songUrl, song.userUrl)))
              .then(() => dispatch(fetchUserSongs(currentUser.profileUrl)))
          } else {
            like({ userId: currentUser.id, songId: song.id })
              .then(() => dispatch(fetchSongFromUrl(song.songUrl, song.userUrl)))
              .then(() => dispatch(fetchUserSongs(currentUser.profileUrl)))
          }
        }
      }}>
      <FaHeart /> 
      {text ? (
        <div className='like-button-text'>
          {`${text}`}
        </div>
      ) : null}
    </div>
  );
}