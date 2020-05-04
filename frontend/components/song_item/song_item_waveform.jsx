import React from 'react';

export default class SongItemWaveform extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const { song } = this.props;
    return (
      <div className='song-item-waveform'>
        <div>{ this.currentTimeContent() }</div>
        <div></div>
        <div>{ this.convertSecsToMins(song.duration) }</div>
      </div>
    )
  }
}