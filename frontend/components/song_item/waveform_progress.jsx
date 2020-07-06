import React from 'react';

export default class WaveformProgress extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlayingHover = this.handlePlayingHover.bind(this);
  }

  componentDidMount() {
    const { song, audio, item } = this.props;
    document.querySelector(`#waveform-progress-${song.id}`).style.width = `${(audio.currentSong.currentTime / song.duration) * 100}%`;
    document.querySelector(`#waveform-progress-playing-${song.id}`).style.width = '0';
    if (item) {
      document.querySelectorAll(`#waveform-progress-full-${song.id} img`).forEach(img => {
        img.style.height = '70px';
      })
    }
  }

  componentDidUpdate() {
    const { audio, song, hovering, waveformWidth } = this.props;
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    const progressWidth = progressDiv.offsetWidth;
    const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`);
    const playingWidth = playingProgressDiv.offsetWidth;
    if (hovering) {
      const currentTimeWidth = (audio.currentSong.currentTime / song.duration) * waveformWidth;
      if (progressWidth + playingWidth <= currentTimeWidth) {
        playingProgressDiv.style.width = `${currentTimeWidth - progressDiv.offsetWidth}px`;
      } else {
        progressDiv.style.width = `${currentTimeWidth}px`;
        playingProgressDiv.style.width = `${progressWidth + playingWidth - currentTimeWidth}px`;
        playingProgressDiv.scrollLeft = progressDiv.offsetWidth;
      }
    } else {
      progressDiv.style.width = `${(audio.currentSong.currentTime / song.duration) * 100}%`;
      playingProgressDiv.style.width = '0';
    }
  }

  handlePlayingHover(e) {
    const { song, audio } = this.props;
    const playingProgressDiv = document.querySelector(`#waveform-progress-playing-${song.id}`);
    const progressDiv = document.querySelector(`#waveform-progress-${song.id}`);
    const currentTime = document.querySelector(`#waveform-time-${song.id} > div:first-child`);
    const waveformWidth = document.querySelector('.waveform-progress-full').offsetWidth;
    const mousePosition = e.nativeEvent.offsetX;
    const songPosition = (audio.currentSong.currentTime / song.duration) * waveformWidth;
    const time = Math.floor((mousePosition / e.target.offsetWidth) * song.duration);
    currentTime.innerHTML = this.props.convertSecsToMins(time);
    const widthDiff = mousePosition - songPosition;
    if (widthDiff > 0) {
      progressDiv.style.width = `${songPosition}px`;
      playingProgressDiv.style.width = `${widthDiff}px`;
      playingProgressDiv.scrollLeft = songPosition;
    } else {
      progressDiv.style.width = `${mousePosition}px`;
      playingProgressDiv.style.width = `${-widthDiff}px`;
      playingProgressDiv.scrollLeft = mousePosition;
    }
  }

  render() {
    const { song, waveformWidth } = this.props;
    // console.log(this.props.hovering)

    return (
      <div
        id={`waveform-progress-full-${song.id}`}
        className='waveform-progress-full'
        onMouseMove={this.handlePlayingHover}
      >
        <div
          id={`waveform-progress-${song.id}`} className='waveform-progress'
        >
          <img
            id={`waveform-progress-img-${song.id}`} className='waveform-progress-img'
            src={song.waveform} alt="waveform"
            width={`${waveformWidth}px`}
            style={{ filter: 'invert(17%) sepia(86%) saturate(6300%) hue-rotate(330deg) brightness(80%) contrast(99%)', width: `${waveformWidth}px` }}
          />
        </div>
        <div
          id={`waveform-progress-playing-${song.id}`} className='waveform-progress-playing'
        >
          <img
            id={`waveform-progress-playing-img-${song.id}`} className='waveform-progress-playing-img'
            src={song.waveform} alt="waveform"
            width={`${waveformWidth}px`}
            style={{ filter: 'invert(21%) sepia(62%) saturate(1084%) hue-rotate(305deg) brightness(95%) contrast(89%)', width: `${waveformWidth}px` }}
        />
        </div>
      </div>
    )
  }
}