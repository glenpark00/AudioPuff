import React, { useState, useEffect } from 'react';
import WaveformProgress from './waveform_progress';
import { displayGlobalAudioPlayer } from '../../actions/ui_actions';
import { fetchCurrentSongFileUrl, changeCurrentTime } from '../../actions/songs_actions';
import { convertSecsToMins } from '../../util/general_util';
import { useDispatch, useSelector } from 'react-redux';

const SongItemWaveform = ({ song, songIds, item }) => {
  const [width, setWidth] = useState(0),
    [hovering, setHovering] = useState(false),
    audio = useSelector(state => state.audio),
    dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', resizeProgress);
    return () => {
      window.removeEventListener('resize', resizeProgress);
    }
  })

  const resizeProgress = () => {
    const width = document.querySelector('.waveform-audio').offsetWidth;
    setWidth(width);
  } 

  const currentTimeContent = () => {
    if (audio.currentSong.id === song.id && audio.currentSong.currentTime) {
      return convertSecsToMins(audio.currentSong.currentTime);
    } else {
      return convertSecsToMins(0);
    }
  }

  const showPlayer = async e => {
    await dispatch(fetchCurrentSongFileUrl(song.id, songIds));
    await dispatch(displayGlobalAudioPlayer());
    return e;
  }

  const handleClick = e => {
    e.persist();
    if (audio.currentSong.id === song.id) {
      const newTime = Math.floor((e.nativeEvent.offsetX / e.target.offsetWidth) * song.duration);
      changeCurrentTime(newTime);
      document.querySelector('.global-audio-player').currentTime = newTime;
      const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`);
      const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
      progressDiv.style.width = `${(newTime / song.duration) * 100}%`;
      playingProgressDiv.style.width = '0';
    } else {
      showPlayer(e)
        .then((e) => {
          resizeProgress();
          changeCurrentTime(0);
          document.querySelector('.global-audio-player').currentTime = 0;
          const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
          const widthDiff = e.nativeEvent.offsetX - progressDiv.offsetWidth;
          const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`);
          playingProgressDiv.style.width = `${widthDiff}px`;
          playingProgressDiv.scrollLeft = progressDiv.offsetWidth;
        })
    }
  }

  const handleMouseEnter = () => {
    setHovering(true);
    if (audio.currentSong.id !== song.id) {
      document.querySelector(`#waveform-audio-${song.id}`).animate([
        { opacity: 0.7 },
        { opacity: 1.0 }
      ], 200)
    }
  }

  const handleMouseLeave = () => {
    setHovering(false);
    if (audio.currentSong.id !== song.id) {
      document.querySelector(`#waveform-audio-${song.id}`).animate([
        { opacity: 1.0 },
        { opacity: 0.7 }
      ], 200)
    }
  }

  const waveform = document.querySelector('.waveform-audio');
  const waveformWidth = waveform ? waveform.offsetWidth : 0;
  const hasFilter = !hovering && audio.currentSong.id !== song.id;

  return (
    <div 
      className='song-item-waveform' 
      onClick={handleClick} 
      style={item ? { height: '60px' } : {}}
    >
      <div 
        id={`waveform-audio-${song.id}`}
        className='waveform-audio' 
        onMouseOver={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        style={hasFilter ? { opacity: 0.7 } : {}}
      >
        { audio.currentSong.id === song.id ? 
          <WaveformProgress 
            song={song}
            audio={audio}
            hovering={hovering}
            waveformWidth={waveformWidth}
            convertSecsToMins={convertSecsToMins}
            item={item}
          /> : null
        }
        <img 
          className='waveform-default' 
          src={song.waveform} alt='waveform'
          style={item ? { filter: 'invert(10%) sepia(0%) saturate(100%) hue-rotate(600deg) brightness(50%) contrast(35%)', height: '60px' } : {}}
        />
      </div>
      <div 
        id={`waveform-time-${song.id}`} 
        className='waveform-time' 
        style={item ? { bottom: '38%' } : {}}
      >
        <div 
          className='waveform-time-text' 
          onClick={e => e.stopPropagation()}
          >
          {hovering ? '0:00' : currentTimeContent()}
        </div> 
        <div className='waveform-time-text' onClick={e => e.stopPropagation()}>{convertSecsToMins(song.duration)}</div>
      </div>
    </div>
  )
}

export default SongItemWaveform;