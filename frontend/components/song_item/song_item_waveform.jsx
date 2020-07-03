import React from 'react';
import WaveformProgress from './waveform_progress';

export default class SongItemWaveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waveformWidth: 0,
      hovering: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.resizeProgress = this.resizeProgress.bind(this);
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

  convertSecsToMins(seconds) {
    let mins = Math.floor(seconds / 60).toString();
    let secs = seconds % 60;
    secs = (secs < 10 ? '0' + secs.toString() : secs.toString());
    return `${mins}:${secs}`
  }

  currentTimeContent() {
    const { audio, song } = this.props;
    if (audio.currentSong.id === song.id && audio.currentSong.currentTime) {
      return this.convertSecsToMins(audio.currentSong.currentTime);
    } else {
      return this.convertSecsToMins(0);
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

  setHovering(bool) {
    this.setState({ hovering: bool })
  }

  render() {
    const { song, audio, item } = this.props;
    const { hovering } = this.state;
    const waveform = document.querySelector('.waveform-audio');
    const waveformWidth = waveform ? waveform.offsetWidth : 0;
    const hasFilter = item && (!hovering && audio.currentSong.id !== song.id)
    
    return (
      <div 
        className='song-item-waveform' 
        onClick={this.handleClick} 
        style={item ? { height: '60px' } : {}}
      >
        <div 
          className='waveform-audio' 
          onMouseEnter={() => this.setHovering(true)}
          onMouseLeave={() => this.setHovering(false)}
          style={hasFilter ? { opacity: 0.7 } : {}}
        >
          { audio.currentSong.id === song.id ? 
            <WaveformProgress 
              song={song}
              audio={audio}
              hovering={hovering}
              waveformWidth={waveformWidth}
              convertSecsToMins={this.convertSecsToMins}
              item={item}
              /> : null
          }
          <img 
            className='waveform-default' 
            src={song.waveform} alt='waveform'
            style={item ? { filter: 'invert(10%) sepia(0%) saturate(100%) hue-rotate(600deg) brightness(50%) contrast(35%)', height: '70px' } : {}}
          />
        </div>
        <div id={`waveform-time-${song.id}`} className='waveform-time'>
          <div 
            className='waveform-time-text' 
            onClick={e => e.stopPropagation()}
            >
            {this.state.hovering ? '0:00' : this.currentTimeContent()}
          </div> 
          <div className='waveform-time-text' onClick={e => e.stopPropagation()}>{this.convertSecsToMins(song.duration)}</div>
        </div>
      </div>
    )
  }
}