import React from 'react';

export default class SongItemWaveform extends React.Component {
  componentDidMount() {
    this.handleClick = this.handleClick.bind(this);
    const { song } = this.props;
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    progressDiv.style.width = '0%';
    const progressImg = document.querySelector(`#waveform-progress-img-${song.id}`)
    progressImg.style.filter = 'invert(17%) sepia(86%) saturate(6300%) hue-rotate(330deg) brightness(80%) contrast(99%)';
    progressImg.style.width = document.querySelector('.waveform-audio').offsetWidth + 'px';
  }

  componentDidUpdate() {
    const { currentSong, song } = this.props;
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    if (currentSong.id === song.id) {
      progressDiv.style.width = `${(currentSong.currentTime / song.duration) * 100}%`;
    } else {
      progressDiv.style.width = '0%';
    }
  }

  convertSecsToMins(seconds) {
    let mins = Math.floor(seconds / 60).toString();
    let secs = seconds % 60;
    secs = (secs < 10 ? '0' + secs.toString() : secs.toString());
    return `${mins}:${secs}`
  } 

  currentTimeContent() {
    const { currentSong, song } = this.props;
    if (currentSong.id === song.id && currentSong.currentTime) {
      return this.convertSecsToMins(currentSong.currentTime);
    } else {
      return this.convertSecsToMins(0);
    }
  }

  handleClick(e) {
    const { changeCurrentTime, song } = this.props;
    const newTime = Math.floor((e.nativeEvent.offsetX / e.target.offsetWidth) * song.duration);
    changeCurrentTime(newTime);
    document.querySelector('.global-audio-player').currentTime = newTime;
  }

  render() {
    const { song } = this.props;
    return (
      <div className='song-item-waveform'>
        <div className='waveform-audio' onClick={this.handleClick}>
          <div id={`waveform-progress-${song.id}`} className='waveform-progress'>
            <img id={`waveform-progress-img-${song.id}`} className='waveform-progress-img' src={song.waveform} alt="waveform"/>
          </div>
          <img className='waveform-default' src={song.waveform} alt="waveform"/>
        </div>
        <div className='waveform-time'>
          <div className='waveform-time-text'>{ this.currentTimeContent() }</div>
          <div className='waveform-time-text'>{ this.convertSecsToMins(song.duration) }</div>
        </div>
      </div>
    )
  }
}