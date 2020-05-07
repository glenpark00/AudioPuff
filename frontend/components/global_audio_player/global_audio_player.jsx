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

  content() {
    const { currentSong, displayPlayer, users } = this.props;
    const user = users[currentSong.userId];
    if (displayPlayer && currentSong && user) {
      return (
        <>
          <div className='global-audio-player-div'>
            <button onClick={ this.handleControls }>{this.buttonContent()}</button>
            <div className='progress-bar'>
              <div>{currentSong.currentTime}</div>
              <div className='progress-line'></div>
              <div>{currentSong.duration}</div>
            </div>
            <div className='player-song-info-container'>
              <img className='player-song-image' src={currentSong.imageUrl} />
              <div className='player-song-info'>
                <div>{user.displayName}</div>
                <div>{currentSong.title}</div>
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