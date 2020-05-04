import React from 'react';

export default class GlobalAudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  handlePlay() {
    const player = document.querySelector('.global-audio-player')
    player.play();
    this.props.playAudio();
  }

  handlePause() {
    const player = document.querySelector('.global-audio-player')
    player.pause();
    this.props.pauseAudio();
  }

  handleTimeUpdate(e) {
    this.props.changeCurrentTime(Math.trunc(e.target.currentTime));
  }

  content() {
    if (this.props.displayPlayer && this.props.currentSong) {
      return (
        <>
          <div className='global-audio-player-div'>
            <button onClick={ this.handlePlay }>Play</button>
            <button onClick={ this.handlePause }>Pause</button>
            <audio className='global-audio-player' onTimeUpdate={ this.handleTimeUpdate } controls autoPlay src={ this.props.currentSong.fileUrl }></audio>
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