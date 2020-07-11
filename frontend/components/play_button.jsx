import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayGlobalAudioPlayer } from '../actions/ui_actions';
import { fetchCurrentSongFileUrl, playAudio, pauseAudio } from '../actions/songs_actions';
import { FaPlay, FaPause } from 'react-icons/fa';

const PlayButton = ({ song, songIds, type }) => {
  const audio = useSelector(state => state.audio);
  const displayPlayer = useSelector(state => state.ui.displayPlayer);

  const dispatch = useDispatch();

  const handlePlayButton = () => {
    if (audio.playing && song.id === audio.currentSong.id) {
      const globalAudio = document.querySelector('.global-audio-player');
      globalAudio.pause();
      dispatch(pauseAudio());
    } else {
      if (displayPlayer && audio.currentSong.id === song.id) {
        const globalAudio = document.querySelector('.global-audio-player');
        globalAudio.play();
        dispatch(playAudio());
      } else {
        dispatch(displayGlobalAudioPlayer());
        dispatch(fetchCurrentSongFileUrl(song.id, songIds));
      }
    }
  }
  
  return (
    <div 
      id={`song-${type}-play-${song.id}`}
      className={`song-${type}-play`}
      onClick={handlePlayButton}
    > 
      {audio.playing && audio.currentSong.id === song.id ?
        <FaPause className={`${type}-play-button-icon`} /> : <FaPlay className={`${type}-play-button-icon`} />
      }
    </div>
  )
}

export default PlayButton;