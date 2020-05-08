import React from 'react';
import { debounce } from 'throttle-debounce';
import { FaPlay, FaPause } from 'react-icons/fa';

export default class GlobalAudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleControls = this.handleControls.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  handleControls() {
    const player = document.querySelector('.global-audio-player')
    if (this.props.currentSong.playing) {
      player.pause();
      this.props.pauseAudio();
    } else {
      player.play();
      this.props.playAudio();
    }
  }

  handlePause() {
    const player = document.querySelector('.global-audio-player')
    player.pause();
    this.props.pauseAudio();
  }

  handleTimeUpdate(e) {
    const globalAudioTime = e.target.currentTime
    return debounce(800, true, () => this.props.changeCurrentTime(Math.trunc(globalAudioTime)));
  }

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
    return (this.props.currentSong.currentTime / this.props.currentSong.duration) * 100
  }

  content() {
    const { currentSong, displayPlayer, users } = this.props;
    const user = users[currentSong.userId];
    const currentProgress = this.currentProgress()
    if (displayPlayer && currentSong && user) {
      return (
        <>
          <div className='global-audio-player-div'>
            <div onClick={ this.handleControls }>{this.buttonContent()}</div>
            <div className='progress-bar'>
              <div className='player-time'>{this.convertSecsToMins(currentSong.currentTime)}</div>
              <div className='current-progress-line' style={{width: `${currentProgress}%`}}></div>
              <div className='progress-line' style={{ width: `${100 - currentProgress}%`}}></div>
              <div className='player-time'>{this.convertSecsToMins(currentSong.duration)}</div>
            </div>
            <div className='player-song-info-container'>
              <img className='player-song-image' src={currentSong.imageUrl} />
              <div className='player-song-info'>
                <div className='player-song-name'>{user.displayName}</div>
                <div className='player-song-title'>{currentSong.title}</div>
              </div>
            </div>
            <audio hidden className='global-audio-player' onTimeUpdate={ e => this.handleTimeUpdate(e)() } controls autoPlay src={ currentSong.fileUrl }></audio>
          </div>
          <div className='phantom-audio-player'></div>
        </>
      )
    } else {
      return null
    }
  }

  render() {
    return this.content();
  }
}