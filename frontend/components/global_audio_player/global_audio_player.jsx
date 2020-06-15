import React from 'react';
import { throttle } from 'throttle-debounce';
import { FaPlay, FaPause } from 'react-icons/fa';

export default class GlobalAudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleControls = this.handleControls.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playNextSong = this.playNextSong.bind(this);
  }

  handleControls() {
    const { audio, pauseAudio, playAudio } = this.props;
    const player = document.querySelector('.global-audio-player');
    if (audio.currentSong.playing) {
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

  render() {
    const { audio, displayPlayer, users } = this.props;
    const user = (audio.currentSong ? users[audio.currentSong.userUrl] : null);
    if (!displayPlayer || !audio.currentSong || !user) return null;
    const currentProgress = this.currentProgress()
    return (
      <>
        <div className='phantom-audio-player'><div></div></div>
        <div className='global-audio-player-div'>
          <div onClick={this.handleControls}>{this.buttonContent()}</div>
          <div className='progress-bar'>
            <div className='player-time'>{this.convertSecsToMins(audio.currentSong.currentTime)}</div>
            <div className='full-progress-line' onClick={this.handleClick}>
              <div className='current-progress-line' style={{ width: `${currentProgress}%` }}></div>
              <div className='progress-line' style={{ width: `${100 - currentProgress}%` }}></div>
            </div>
            <div className='player-time'>{this.convertSecsToMins(audio.currentSong.duration)}</div>
          </div>
          <div className='player-song-info-container'>
            <img className='player-song-image' src={audio.currentSong.imageUrl} />
            <div className='player-song-info'>
              <div className='player-song-name'>{user.displayName}</div>
              <div className='player-song-title'>{audio.currentSong.title}</div>
            </div>
          </div>
          <audio 
            muted hidden 
            className='global-audio-player' 
            onTimeUpdate={e => this.handleTimeUpdate(e)} 
            onEnded={this.playNextSong}
            controls autoPlay 
            src={audio.currentSong.fileUrl}
          ></audio>
        </div>
      </>
    )
  }
}