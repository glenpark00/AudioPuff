import React from 'react';
import { throttle } from 'throttle-debounce';
import { FaPlay, FaPause, FaVolumeDown, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md'; 

export default class GlobalAudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleControls = this.handleControls.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playNextSong = this.playNextSong.bind(this);
    this.playPrevSong = this.playPrevSong.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  componentDidMount() {
    const player = document.querySelector('.global-audio-player');
    player.volume = 0.5;
  }

  handleControls() {
    const { audio, pauseAudio, playAudio } = this.props;
    const player = document.querySelector('.global-audio-player');
    if (audio.playing) {
      player.pause();
      pauseAudio();
    } else {
      player.play();
      playAudio();
    }
  }

  handlePause() {
    const player = document.querySelector('.global-audio-player')
    player.pause();
    this.props.pauseAudio();
  }

  handleTimeUpdate(e) {
    const globalAudioTime = e.target.currentTime;
    this.updateTime(globalAudioTime);
  }

  updateTime = throttle(200, time => {
    this.props.changeCurrentTime(Math.trunc(time));
  })

  buttonContent() {
    const player = document.querySelector('.global-audio-player');
    if (!player) {
      return null;
    }
    if (player.paused) {
      return <FaPlay />
    } else {
      return <FaPause />
    }
  }

  volumeContent() {
    const player = document.querySelector('.global-audio-player');
    if (!player) {
      return null;
    }
    if (player.volume === 0) {
      return <FaVolumeMute />
    } else if (player.volume < 0.5) {
      return <FaVolumeDown />
    } else {
      return <FaVolumeUp />
    }
  }

  onVolumeMouseEnter() {
    document.querySelector('.global-audio-slider-container').style.display = 'flex';
  }
  
  onVolumeMouseLeave() {
    document.querySelector('.global-audio-slider-container').style.display = 'none';
  }

  convertSecsToMins(seconds) {
    let mins = Math.floor(seconds / 60).toString();
    let secs = seconds % 60;
    secs = (secs < 10 ? '0' + secs.toString() : secs.toString());
    return `${mins}:${secs}`
  } 

  currentProgress() {
    return (this.props.audio.currentSong.currentTime / this.props.audio.currentSong.duration) * 100
  }

  handleClick(e) {
    const { changeCurrentTime, audio } = this.props;
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.pageX - currentTargetRect.left;
    const newTime = Math.floor((offsetX / e.currentTarget.offsetWidth) * audio.currentSong.duration);
    changeCurrentTime(newTime);
    document.querySelector('.global-audio-player').currentTime = newTime;
  }

  playNextSong() {
    const { fetchCurrentSongFileUrl, audio } = this.props;
    if (audio.songIds.length <= 1) {
      const player = document.querySelector('.global-audio-player');
      player.play();
    } else {
      fetchCurrentSongFileUrl(audio.nextSong);
    }
  }

  playPrevSong() {
    const { fetchCurrentSongFileUrl, audio, changeCurrentTime } = this.props;
    const player = document.querySelector('.global-audio-player');
    if (audio.currentSong.currentTime > 1) {
      changeCurrentTime(0);
      player.currentTime = 0;
    } else if (audio.songIds.length <= 1) {
      player.play();
    } else {
      fetchCurrentSongFileUrl(audio.prevSong);
    }
  }

  handleDotMouseEnter() {
    document.querySelector('.progress-line-dot').style.display = 'block';
  }

  handleDotMouseLeave() {
    document.querySelector('.progress-line-dot').style.display = 'none';
  }

  handleVolumeChange(e) {
    const player = document.querySelector('.global-audio-player');
    player.volume = e.target.value / 100;
  }

  handleVolumeClick() {
    const player = document.querySelector('.global-audio-player');
    const slider = document.querySelector('.global-audio-slider');
    if (player.volume > 0) {
      player.volume = 0;
      slider.value = 0;
    } else {
      player.volume = 0.5;
      slider.value = 50;
    }
  }

  render() {
    const { audio, users } = this.props;
    const user = (audio.currentSong.userUrl ? users[audio.currentSong.userUrl] : {});
    const currentProgress = this.currentProgress();
    return (
      <>
        <div className='phantom-audio-player'><div></div></div>
        <div className='global-audio-player-div'>
          <div className='global-audio-buttons'>
            <div className='global-audio-skip-btn' onClick={this.playPrevSong}><MdSkipPrevious /></div>
            <div onClick={this.handleControls}>{this.buttonContent()}</div>
            <div className='global-audio-skip-btn' onClick={this.playNextSong}><MdSkipNext /></div>
          </div>
          <div className='progress-bar' onMouseEnter={this.handleDotMouseEnter} onMouseLeave={this.handleDotMouseLeave}>
            <div className='player-time'>{this.convertSecsToMins(audio.currentSong.currentTime)}</div>
            <div className='full-progress-line' onClick={this.handleClick}>
              <div className='current-progress-line' style={{ width: `${currentProgress}%` }}></div>
              <div className='progress-line-dot'></div>
              <div className='progress-line' style={{ width: `${100 - currentProgress}%` }}></div>
            </div>
            <div className='player-time'>{this.convertSecsToMins(audio.currentSong.duration)}</div>
          </div>
          <div className='global-audio-volume-container' onMouseEnter={this.onVolumeMouseEnter} onMouseLeave={this.onVolumeMouseLeave}>
            <div className='global-audio-volume' onClick={this.handleVolumeClick}>
              {this.volumeContent()}
            </div>
            <div className='global-audio-slider-container' onMouseEnter={this.onVolumeMouseEnter} onMouseLeave={this.onVolumeMouseLeave}>
                <input 
                  className='global-audio-slider' 
                  type='range' 
                  onChange={this.handleVolumeChange} 
                  defaultValue='50'
                  min='0' max='100' step='1' />
              </div>
          </div>
          <div className='player-song-info-container'>
            <img className='player-song-image' src={audio.currentSong.imageUrl} />
            <div className='player-song-info'>
              <div className='player-song-name'>{user.displayName}</div>
              <div className='player-song-title'>{audio.currentSong.title}</div>
            </div>
          </div>
          <audio 
            hidden muted
            className='global-audio-player' 
            onTimeUpdate={e => this.handleTimeUpdate(e)} 
            onEnded={this.playNextSong}
            autoPlay 
            src={audio.currentSong.fileUrl}
          ></audio>
        </div>
      </>
    )
  }
}