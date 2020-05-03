import React from 'react';

export default class GlobalAudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  content() {
    if (this.props.displayPlayer && this.props.currentSong) {
      return (
        <>
          <div>
            <audio className='global-audio-player' controls autoPlay src={ this.props.currentSong.fileUrl }></audio>
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