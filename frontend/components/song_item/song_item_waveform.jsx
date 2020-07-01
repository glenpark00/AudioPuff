import React from 'react';

export default class SongItemWaveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverInterval: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.resizeProgressDiv = this.resizeProgressDiv.bind(this);
    this.handlePlayingHover = this.handlePlayingHover.bind(this);
    this.hidePlaying = this.hidePlaying.bind(this);
  }

  componentDidMount() {
    if (!window.resizeWaveform) {
      window.addEventListener('resize', this.resizeProgressDiv);
      window.resizeWaveform = true;
    }
    const { song, audio } = this.props;
    const progressImg = document.querySelector(`#waveform-progress-img-${song.id}`);
    progressImg.style.filter = 'invert(17%) sepia(86%) saturate(6300%) hue-rotate(330deg) brightness(80%) contrast(99%)';
    const playingProgressImg = document.querySelector(`#waveform-progress-playing-img-${song.id}`);
    // playingProgressImg.style.filter = 'invert(33%) sepia(64%) saturate(5919%) hue-rotate(332deg) brightness(96%) contrast(90%);'
    playingProgressImg.style.filter = 'invert(17%) sepia(70%) saturate(5500%) hue-rotate(330deg) brightness(75%) contrast(85%)'
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`)
    if (audio.currentSong.id === song.id) {
      progressDiv.style.width = `${(audio.currentSong.currentTime / song.duration) * 100}%`;
    } else {
      progressDiv.style.width = '0%';
    }
    playingProgressDiv.style.width = '0%';
  }

  componentWillUnmount() {
    if (window.resizeWaveform) {
      window.removeEventListener('resize', this.resizeProgressDiv);
    }
  }

  componentDidUpdate(prevProps) {
    const { audio, song } = this.props;
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    const progressDivWidth = progressDiv.offsetWidth;
    const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`);
    if (!prevProps.audio.playing && audio.playing) {
      this.resizeProgressDiv();
    }
    if (audio.currentSong.id === song.id) {
      progressDiv.style.width = `${(audio.currentSong.currentTime / song.duration) * 100}%`;
      const widthDiff = playingProgressDiv.offsetWidth - (progressDiv.offsetWidth - progressDivWidth);
      playingProgressDiv.style.width = `${widthDiff}px`;
      playingProgressDiv.scrollLeft = playingProgressDiv.scrollLeft + (progressDiv.offsetWidth - progressDivWidth);
    } else {
      progressDiv.style.width = '0%';
    }
  }

  resizeProgressDiv() {
    const progressImgs = document.querySelectorAll('.waveform-progress-img')
    progressImgs.forEach(img => img.style.width = `${document.querySelector('.waveform-audio').offsetWidth}px`)
    // const progressImg = document.querySelector(`#waveform-progress-img-${this.props.song.id}`)
    // progressImg.style.width = `${document.querySelector('.waveform-audio').offsetWidth}px`;
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

  handlePlayingHover(e) {
    const { song } = this.props;
    const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`);
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    const time = Math.floor((e.nativeEvent.offsetX / e.target.offsetWidth) * song.duration);
    const widthDiff = e.nativeEvent.offsetX - progressDiv.offsetWidth;
    playingProgressDiv.style.width = `${widthDiff}px`;
    playingProgressDiv.scrollLeft = progressDiv.offsetWidth;
    playingProgressDiv.style.display = 'inline-block';
  }

  hidePlaying() {
    const { song } = this.props;
    document.querySelector(`#waveform-progress-playing-${song.id}`).style.display = 'none';
  }

  render() {
    const { song, audio } = this.props;
    const waveform = document.querySelector('.waveform-audio');
    const waveformWidth = waveform ? waveform.offsetWidth : 0;

    const currTime = document.querySelector('.waveform-time > div:first-child');
    if (currTime && audio.currentSong.id === song.id) {
      currTime.style.display = 'inline-block';
    } 

    return (
      <div className='song-item-waveform' onClick={this.handleClick}>
        <div className='waveform-audio'>
          <div 
            id={`waveform-progress-full-${song.id}`} 
            className='waveform-progress-full'
            onMouseMove={this.handlePlayingHover}
            onMouseLeave={this.hidePlaying}
          >
            <div 
              id={`waveform-progress-${song.id}`} 
              className='waveform-progress'
            >
              <img 
                id={`waveform-progress-img-${song.id}`} className='waveform-progress-img' src={song.waveform} alt="waveform" width={`${waveformWidth}px`} 
              />
            </div>
            <div 
              id={`waveform-progress-playing-${song.id}`} className='waveform-progress-playing'
            >
              <img 
                id={`waveform-progress-playing-img-${song.id}`} className='waveform-progress-playing-img' src={song.waveform} alt="waveform" width={`${waveformWidth}px`} 
              />
            </div>
          </div>
          <img 
            className='waveform-default' 
            src={song.waveform} alt='waveform'
          />
        </div>
        <div className='waveform-time'>
          <div className='waveform-time-text' onClick={e => e.stopPropagation()}>{this.currentTimeContent()}</div>
          <div className='waveform-time-text' onClick={e => e.stopPropagation()}>{this.convertSecsToMins(song.duration)}</div>
        </div>
      </div>
    )
  }
}