import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default class SongDisplayItem extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlayButton = this.handlePlayButton.bind(this); 
  }
  
  handlePlayButton() {
    const { currentSong, song, displayGlobalAudioPlayer, fetchCurrentSongFileUrl, playAudio, pauseAudio } = this.props;
    if (currentSong.playing && song.id === currentSong.id) {
      const globalAudio = document.querySelector('.global-audio-player');
      globalAudio.pause();
      pauseAudio();
    } else {
      if (currentSong.id === song.id) {
        const globalAudio = document.querySelector('.global-audio-player');
        globalAudio.play();
        playAudio();
      } else {
        displayGlobalAudioPlayer();
        fetchCurrentSongFileUrl(song.id);
      }
    }
  }

  playButtonContent() {
    const { currentSong, song } = this.props;
    if (currentSong.id === song.id && currentSong.playing) {
      return <FaPause />
    } else {
      return <FaPlay />
    }
  }

  render() {
    const { song, user } = this.props;
    if (song && user) {
      return (
        <div className='song-display'>
          <img className='song-display-image' onClick={this.openSongShow} src={song.imageUrl} />
          <div className='song-display-play' onClick={this.handlePlayButton}>{this.playButtonContent()}</div>
          <div className='song-display-info'>
            <div className='song-display-title'>{song.title}</div>
            <div className='song-display-user-name'>{user.displayName}</div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}