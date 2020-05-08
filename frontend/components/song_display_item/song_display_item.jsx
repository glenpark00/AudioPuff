import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default class SongDisplayItem extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlayButton = this.handlePlayButton.bind(this);
    this.openSongShow = this.openSongShow.bind(this);
    this.linkToProfile = this.linkToProfile.bind(this);
    this.showPlayButton = this.showPlayButton.bind(this);
    this.hidePlayButton = this.hidePlayButton.bind(this);
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

  openSongShow() {
    this.props.history.push(`/${this.props.user.profileUrl}/${this.props.song.songUrl}`);
  }

  linkToProfile() {
    this.props.history.push(`/${this.props.user.profileUrl}`);
  }

  showPlayButton() {
    const songImage = document.querySelector(`#song-display-play-${this.props.song.id}`);
    if (songImage) songImage.style.display = "block";
  }

  hidePlayButton() {
    const songImage = document.querySelector(`#song-display-play-${this.props.song.id}`);
    if (songImage) songImage.style.display = "none";
  }

  render() {
    const { song, user, currentSong } = this.props;
    if (song && user) {
      return (
        <div className='song-display'>
          <img className='song-display-image' onClick={this.openSongShow} onMouseOver={this.showPlayButton} onMouseLeave={this.hidePlayButton} src={song.imageUrl} />
          { currentSong.playing && currentSong.id === song.id ?
            <div className='song-display-play' onClick={this.handlePlayButton}>{this.playButtonContent()}</div>
            : <div id={`song-display-play-${song.id}`} className='song-display-play' onMouseOver={this.showPlayButton} onClick={this.handlePlayButton}>{this.playButtonContent()}</div> 
          }
          <div className='song-display-info'>
            <div className='song-display-title' onClick={this.openSongShow}>{song.title}</div>
            <div className='song-display-user-name' onClick={this.linkToProfile}>{user.displayName}</div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}