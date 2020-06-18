import React from 'react';

export default class SongItemWaveform extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.resizeProgressDiv = this.resizeProgressDiv.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeProgressDiv);
    const { song, audio } = this.props;
    const progressImg = document.querySelector(`#waveform-progress-img-${song.id}`)
    progressImg.style.filter = 'invert(17%) sepia(86%) saturate(6300%) hue-rotate(330deg) brightness(80%) contrast(99%)';
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    if (audio.currentSong.id === song.id) {
      progressDiv.style.width = `${(audio.currentSong.currentTime / song.duration) * 100}%`;
    } else {
      progressDiv.style.width = '0%';
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeProgressDiv);
  }

  componentDidUpdate(prevProps) {
    const { audio, song } = this.props;
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    if (!prevProps.audio.playing && audio.playing) {
      this.resizeProgressDiv();
    }
    if (audio.currentSong.id === song.id) {
      progressDiv.style.width = `${(audio.currentSong.currentTime / song.duration) * 100}%`;
    } else {
      progressDiv.style.width = '0%';
    }
  }

  resizeProgressDiv() {
    const progressImg = document.querySelector(`#waveform-progress-img-${this.props.song.id}`)
    progressImg.style.width = `${document.querySelector('.waveform-audio').offsetWidth}px`;
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
    } else {
      this.displayPlayer(e)
        .then((e) => {
          this.resizeProgressDiv();
          const newTime = Math.floor((e.nativeEvent.offsetX / e.target.offsetWidth) * song.duration);
          changeCurrentTime(newTime);
          document.querySelector('.global-audio-player').currentTime = newTime
        })
    }
  }

  render() {
    const { song } = this.props;
    const waveform = document.querySelector('.waveform-audio');
    const waveformWidth = waveform ? waveform.offsetWidth : 0;
    return (
      <div className='song-item-waveform' onClick={this.handleClick}>
        <div className='waveform-audio'>
          <div id={`waveform-progress-${song.id}`} className='waveform-progress'>
            <img id={`waveform-progress-img-${song.id}`} className='waveform-progress-img' src={song.waveform} alt="waveform" width={`${waveformWidth}px`} />
          </div>
          <img className='waveform-default' src={song.waveform} alt="waveform" />
        </div>
        <div className='waveform-time'>
          <div className='waveform-time-text'>{this.currentTimeContent()}</div>
          <div className='waveform-time-text'>{this.convertSecsToMins(song.duration)}</div>
        </div>
      </div>
    )
  }
}