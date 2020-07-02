import React from 'react';
import { throttle } from 'throttle-debounce';
import { FaPlay, FaPause, FaVolumeDown, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md'; 

export default class GlobalAudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProgress: 0,
      down: false,
      showDot: false
    }
    this.handleControls = this.handleControls.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playNextSong = this.playNextSong.bind(this);
    this.playPrevSong = this.playPrevSong.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.updateDrag = this.updateDrag.bind(this);
    this.handleDotMousedown = this.handleDotMousedown.bind(this);
    this.onVolumeMouseLeave = this.onVolumeMouseLeave.bind(this);
    this.handleDotMouseLeave = this.handleDotMouseLeave.bind(this);
    this.handleDotMouseUp = this.handleDotMouseUp.bind(this);
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
    const { audio } = this.props;
    const globalAudioTime = e.target.currentTime;
    if (!this.state.down) {
      this.setState({ currentProgress: (globalAudioTime / audio.currentSong.duration) * 100 }, () => {
        this.updateTime(globalAudioTime);
      })
    } else {
      this.updateTime(globalAudioTime)
    }
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
    if (!this.state.down) {
      document.querySelector('.global-audio-slider-container').style.display = 'none';
    }
  }

  convertSecsToMins(seconds) {
    let mins = Math.floor(seconds / 60).toString();
    let secs = seconds % 60;
    secs = (secs < 10 ? '0' + secs.toString() : secs.toString());
    return `${mins}:${secs}`
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

  handleDotMouseLeave() {
    if (!this.state.down) {
      this.setState({ showDot: false })
    }
  }

  handleDotMousedown(e) {
    e.preventDefault();
    e.persist();
    this.setState({ down: true }, () => {
      document.addEventListener('mouseup', this.handleDotMouseUp);
      document.addEventListener('mousemove', this.updateDrag);
      this.updateDrag(e)
    })
  }

  handleDotMouseUp(e) {
    this.setState({ down: false }, () => {
      document.removeEventListener('mousemove', this.updateDrag);
      document.removeEventListener('mouseup', this.handleDotMouseUp);
      const progressLine = document.querySelector('.full-progress-line');
      const progressWidth = progressLine.offsetWidth;
      const progressLeft = progressLine.offsetLeft;
      if (e.pageX < progressLeft) {
        this.setState({ showDot: false, currentProgress: 0 }, () => {
          document.querySelector('.global-audio-player').currentTime = 0;
          this.updateTime(0);
        })
      } else if (e.pageX > progressLeft + progressWidth) {
        const { audio } = this.props;
        this.setState({ showDot: false, currentProgress: audio.currentSong.duration - 1 }, () => {
          document.querySelector('.global-audio-player').currentTime = audio.currentSong.duration - 1;
          this.updateTime(audio.currentSong.duration - 1);
        })
      } else if (e.pageY < 714) {
        this.setState({ showDot: false })
      }
    });
  }

  updateDrag(e) {
    const progressLine = document.querySelector('.full-progress-line')
    const offsetX = e.pageX - progressLine.offsetLeft;
    if (this.state.down && e.pageX >= progressLine.offsetLeft && e.pageX <= (progressLine.offsetLeft + progressLine.offsetWidth)) {
      const newPosition = Math.floor((offsetX / progressLine.offsetWidth) * 100);
      this.setState({ currentProgress: newPosition }, () => {
        document.querySelector('.current-progress-line').style.width = `${newPosition}%`
      })
    }
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
    const { currentProgress, down } = this.state;
    const user = (audio.currentSong.userUrl ? users[audio.currentSong.userUrl] : {});
    return (
      <>
        <div className='phantom-audio-player'><div></div></div>
        <div className='global-audio-player-div'>
          <div className='global-audio-buttons'>
            <div className='global-audio-skip-btn' onClick={this.playPrevSong}><MdSkipPrevious /></div>
            <div onClick={this.handleControls}>{this.buttonContent()}</div>
            <div className='global-audio-skip-btn' onClick={this.playNextSong}><MdSkipNext /></div>
          </div>
          <div className='progress-bar'>
            <div className='player-time'>
              { down ? 
                this.convertSecsToMins(Math.floor(currentProgress))
                : this.convertSecsToMins(audio.currentSong.currentTime) 
              }
            </div>
            <div 
              className='full-progress-line' 
              onClick={this.handleClick} 
              onMouseEnter={() => this.setState({ showDot: true })}
              onMouseLeave={this.handleDotMouseLeave}
            >
              <div className='current-progress-line' style={{ width: `${currentProgress}%` }}></div>
              { this.state.showDot ? (
                <div
                  className='progress-dot-container'
                  onMouseDown={this.handleDotMousedown}
                >
                  <div className='progress-line-dot'></div>
                </div>
              ) : null }
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