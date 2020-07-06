import React from 'react';
import WaveformProgress from './waveform_progress';
import { convertSecsToMins } from '../../util/general_util';

export default class SongItemWaveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waveformWidth: 0,
      hovering: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.resizeProgress = this.resizeProgress.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeProgress);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeProgress);
  }

  resizeProgress() {
    const waveformWidth = document.querySelector('.waveform-audio').offsetWidth;
    this.setState({ waveformWidth });
  } 

  currentTimeContent() {
    const { audio, song } = this.props;
    if (audio.currentSong.id === song.id && audio.currentSong.currentTime) {
      return convertSecsToMins(audio.currentSong.currentTime);
    } else {
      return convertSecsToMins(0);
    }
  }

  async displayPlayer(e) {
    const { fetchCurrentSongFileUrl, displayGlobalAudioPlayer, song } = this.props;
    await fetchCurrentSongFileUrl(song.id);
    await displayGlobalAudioPlayer();
    return e;
  }

  handleClick(e) {
    e.persist();
    const { audio, song, changeCurrentTime } = this.props;
    if (audio.currentSong.id === song.id) {
      const newTime = Math.floor((e.nativeEvent.offsetX / e.target.offsetWidth) * song.duration);
      changeCurrentTime(newTime);
      document.querySelector('.global-audio-player').currentTime = newTime;
      const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`);
      const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
      progressDiv.style.width = `${(newTime / song.duration) * 100}%`;
      playingProgressDiv.style.width = '0';
    } else {
      this.displayPlayer(e)
        .then((e) => {
          this.resizeProgress();
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

  handleMouseEnter() {
    const { audio, song } = this.props;
    this.setState({ hovering: true }, () => {
      if (audio.currentSong.id !== song.id) {
        document.querySelector(`#waveform-audio-${song.id}`).animate([
          { opacity: 0.7 },
          { opacity: 1.0 }
        ], 200)
      }
    })
  }

  handleMouseLeave() {
    const { audio, song } = this.props;
    this.setState({ hovering: false }, () => {
      if (audio.currentSong.id !== song.id) {
        document.querySelector(`#waveform-audio-${song.id}`).animate([
          { opacity: 1.0 },
          { opacity: 0.7 }
        ], 200)
      }
    })
  }

  render() {
    const { song, audio, item } = this.props;
    const { hovering } = this.state;
    const waveform = document.querySelector('.waveform-audio');
    const waveformWidth = waveform ? waveform.offsetWidth : 0;
    const hasFilter = !hovering && audio.currentSong.id !== song.id

    return (
      <div 
        className='song-item-waveform' 
        onClick={this.handleClick} 
        style={item ? { height: '60px' } : {}}
      >
        <div 
          id={`waveform-audio-${song.id}`}
          className='waveform-audio' 
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
          // onMouseEnter={() => this.setState({ hovering: true })}
          // onMouseLeave={() => this.setState({ hovering: false })}
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
            style={item ? { filter: 'invert(10%) sepia(0%) saturate(100%) hue-rotate(600deg) brightness(50%) contrast(35%)', height: '70px' } : {}}
          />
        </div>
        <div 
          id={`waveform-time-${song.id}`} 
          className='waveform-time' 
          style={item ? { bottom: '25%' } : {}}
        >
          <div 
            className='waveform-time-text' 
            onClick={e => e.stopPropagation()}
            >
            {this.state.hovering ? '0:00' : this.currentTimeContent()}
          </div> 
          <div className='waveform-time-text' onClick={e => e.stopPropagation()}>{convertSecsToMins(song.duration)}</div>
        </div>
      </div>
    )
  }
}