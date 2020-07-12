import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { like, unlike } from '../util/likes_api_util';
import { fetchUserSongs, fetchUser } from '../actions/users_actions';
import { fetchSongFromUrl } from '../actions/songs_actions';
import { FaHeart } from 'react-icons/fa';

export default function LikeButton({ song, text }) {
  const currentUser = useSelector(state => state.session.currentUser ? state.entities.users[state.session.currentUser.profileUrl] : {}); 
  const [liked, setLiked] = useState(song.likers.includes(currentUser.profileUrl));
  const dispatch = useDispatch();

  useEffect(() => {
    setLiked(song.likers.includes(currentUser.profileUrl))
  }, [currentUser])

  return (
    <div
      className='like-button'
      style={liked ? { color: '#CE1141' } : {}}
      onClick={() => {
        if (currentUser.id) {
          if (liked) {
            unlike({ userId: currentUser.id, songId: song.id })
              .then(() => dispatch(fetchSongFromUrl(song.songUrl, song.userUrl)))
              // .then(() => dispatch(fetchUserSongs(currentUser.profileUrl)))
              .then(() => dispatch(fetchUser(currentUser.id)))
          } else {
            like({ userId: currentUser.id, songId: song.id })
            .then(() => dispatch(fetchSongFromUrl(song.songUrl, song.userUrl)))
            .then(() => dispatch(fetchUser(currentUser.id)))
              // .then(() => dispatch(fetchUserSongs(currentUser.profileUrl)))
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