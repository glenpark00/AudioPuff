import React, { useState } from 'react';
import PlayButton from '../play_button';
import LikeButton from '../like_button';
import { FaHeart } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Playlist = ({ songs, users, history }) => {
  if (!songs[0]) return null;

  const audio = useSelector(state => state.audio);
  const ids = songs.map(song => song.id);
  const [currentIndex, setCurrentIndex] = useState(ids.includes(audio.currentSong.id) ? ids.indexOf(audio.currentSong.id) : 0);
  
  const handleMouseEnter = e => {
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    e.currentTarget.querySelector('.playlist-item-like-button').style.display = 'flex';
    e.currentTarget.querySelector('.playlist-item-likes').style.display = 'none';
  }

  const handleMouseLeave = e => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.querySelector('.playlist-item-like-button').style.display = 'none';
    e.currentTarget.querySelector('.playlist-item-likes').style.display = 'flex';
  }

  return (
    <div className='playlist-container'>
      <div className='playlist-img-container'>
        <img className='playlist-img' src={songs[0].imageUrl} alt=""/>
        <PlayButton song={songs[0]} type='playlist'/> 
      </div>
      <div className='playlist-songs'>
        { songs.map((song, i) => {
          const user = users[song.userUrl];
          if (user) {
            return (
              <div 
                className='playlist-item' 
                key={`playlist-item-${song.id}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={audio.currentSong.id === song.id ? { backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {}}
              > 
                <div>
                  <div>{`${user.displayName} - `}</div>
                  <div>{song.title}</div>
                </div>
                <div className='playlist-item-likes'>
                  <div>{<FaHeart />}{' '}</div>
                  <div>{song.likers.length}</div>
                </div>
                <div className='playlist-item-like-button' style={{ display: 'none' }}>
                  <LikeButton song={song} />
                </div>
              </div>
            )
          } else {
            return null;
          }
        }) }
      </div>
    </div>
  )
}

export default withRouter(Playlist);