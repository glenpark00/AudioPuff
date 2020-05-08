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

  componentDidMount() {
    const wavesurfer = WaveSurfer.create({
      container: `#waveform-audio-${this.props.song.id}`,
      waveColor: 'lightgrey',
      progressColor: '#CE1141',
      barHeight: 2,
      barWidth: 3,
      barRadius: 2,
      height: 70,
      barGap: 3,
      cursorWidth: 0,
      normalize: true,
      responsive: true
    });
    wavesurfer.load(this.props.song.fileUrl);
    wavesurfer.setVolume(0);
  }

  render() {
    const { song } = this.props;
    return (
      <div className='song-item-waveform'>
        <div id={`waveform-audio-${song.id}`} className='waveform-audio' data-song-id={song.id}></div>
        <div className='waveform-time'>
          <div className='waveform-time-text'>{ this.currentTimeContent() }</div>
          <div className='waveform-time-text'>{ this.convertSecsToMins(song.duration) }</div>
        </div>
      </div>
    )
  }
}