import React from 'react';
import LikeButton from '../like_button';
import { displayGlobalAudioPlayer } from '../../actions/ui_actions';
import { fetchCurrentSongFileUrl, playAudio, pauseAudio } from '../../actions/songs_actions';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa';

const Playlist = ({ songs, users }) => {
  if (!songs[0]) return null;

  const audio = useSelector(state => state.audio),
    dispatch = useDispatch();
  
  const handleMouseEnter = e => {
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    e.currentTarget.querySelector('.playlist-item-like-button').style.display = 'flex';
    e.currentTarget.querySelector('.playlist-item-likes').style.display = 'none';
  }

  const handleMouseLeave = (e, song) => {
    if (audio.currentSong.id !== song.id) {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.querySelector('.playlist-item-like-button').style.display = 'none';
      e.currentTarget.querySelector('.playlist-item-likes').style.display = 'flex';
    }
  }
  
  const songIds = songs.map(song => song.id);

  const handlePlay = (song) => {
    if (audio.playing) {
      dispatch(fetchCurrentSongFileUrl(song.id, songIds));
    } else {
      dispatch(displayGlobalAudioPlayer());
      dispatch(fetchCurrentSongFileUrl(song.id, songIds));
    }
  }

  const handlePlayButton = () => {
    const currSongI = songIds.indexOf(audio.currentSong.id);
    const globalAudio = document.querySelector('.global-audio-player');
    if (currSongI >= 0) {
      if (audio.playing) {
        globalAudio.pause();
        dispatch(pauseAudio());
      } else {
        globalAudio.play();
        dispatch(playAudio());
      }
    } else {
      dispatch(displayGlobalAudioPlayer());
      dispatch(fetchCurrentSongFileUrl(songIds[0], songIds));
    }
  }

  return (
    <div className='playlist-container'>
      <div className='playlist'>
        <div className='playlist-img-container'>
          <img className='playlist-img' src={songs[0].imageUrl} alt=""/>
          <div
            className='song-playlist-play'
            onClick={handlePlayButton}
          >
            {audio.playing && songIds.includes(audio.currentSong.id) ?
              <FaPause className='playlist-play-button-icon' /> : <FaPlay className='playlist-play-button-icon' />
            }
          </div>
        </div>
        <div className='playlist-songs'>
          { songs.map((song, i) => {
            const user = users[song.userUrl];
            if (user) {
              return (
                <div 
                  className='playlist-item' 
                  key={`playlist-item-${song.id}`}
                  onClick={() => handlePlay(song)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={e => handleMouseLeave(e, song)}
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
    </div>
  )
}

export default Playlist;