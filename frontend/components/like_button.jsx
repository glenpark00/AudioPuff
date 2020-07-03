import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { like, unlike } from '../util/likes_api_util';
import { fetchSongFromUrl } from '../actions/songs_actions';
import { FaHeart } from 'react-icons/fa';

export default function LikeButton({ song, text }) {
  const currentUser = useSelector(state => state.entities.users[state.session.currentUserUrl])
  const [liked, setLiked] = useState(song.likers.includes(currentUser.profileUrl));

  const dispatch = useDispatch();

  return (
    <div
      className='like-button'
      style={liked ? { color: '#CE1141' } : { color: 'black' }}
      onClick={() => {
        if (liked) {
          unlike({ userUrl: currentUser.profileUrl, songUrl: song.songUrl })
            .then(() => setLiked(false))
            .then(() => dispatch(fetchSongFromUrl(song.songUrl, song.userUrl)))
        } else {
          like({ userUrl: currentUser.profileUrl, songUrl: song.songUrl })
            .then(() => setLiked(true))
            .then(() => dispatch(fetchSongFromUrl(song.songUrl, song.userUrl)))
        }
      }}>
      <FaHeart /> 
      <div className='like-button-text'>
        {`${text}`}
      </div>
    </div>
  );
}