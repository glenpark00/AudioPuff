import React from 'react';
import WaveformProgress from './waveform_progress';

export default class SongItemWaveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.resizeProgressDiv = this.resizeProgressDiv.bind(this);
  }

  componentDidMount() {
    if (!window.resizeWaveform) {
      window.addEventListener('resize', this.resizeProgressDiv);
      window.resizeWaveform = true;
    }
  }

  componentWillUnmount() {
    if (window.resizeWaveform) {
      window.removeEventListener('resize', this.resizeProgressDiv);
    }
  }

  componentDidUpdate(prevProps) {
    const { audio } = this.props;
    if (!prevProps.audio.playing && audio.playing) {
      this.resizeProgressDiv();
    }
  }

  resizeProgressDiv() {
    const progressImgs = document.querySelectorAll('.waveform-progress-full');
    const waveformWidth = document.querySelector('.waveform-audio').offsetWidth;
    progressImgs.forEach(img => img.style.width = `${waveformWidth}px`);
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
          this.resizeProgressDiv();
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
    const { song, audio } = this.props;
    const waveform = document.querySelector('.waveform-audio');
    const waveformWidth = waveform ? waveform.offsetWidth : 0;

    return (
      <div className='song-item-waveform' onClick={this.handleClick}>
        <div 
          className='waveform-audio' 
          onMouseEnter={() => this.setHovering(true)}
          onMouseLeave={() => this.setHovering(false)}
        >
          { audio.currentSong.id === song.id ? 
            <WaveformProgress 
              song={song}
              audio={audio}
              hovering={this.state.hovering}
              waveformWidth={waveformWidth}
              convertSecsToMins={this.convertSecsToMins}
              /> : null
          }
          <img 
            className='waveform-default' 
            src={song.waveform} alt='waveform'
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