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
    const { audio, song, displayGlobalAudioPlayer, fetchCurrentSongFileUrl, playAudio, pauseAudio, displayPlayer } = this.props;
    if (audio.playing && song.id === audio.currentSong.id) {
      const globalAudio = document.querySelector('.global-audio-player');
      globalAudio.pause();
      pauseAudio();
    } else {
      if (displayPlayer && audio.currentSong.id === song.id) {
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
    const { audio, song } = this.props;
    if (audio.currentSong.id === song.id && audio.playing) {
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
    const { song, user } = this.props;
    if (!song || !user) return null;
    return (
      <div className='song-display' >
        <img 
          className='song-display-image' 
          onClick={this.openSongShow} 
          onMouseOver={this.showPlayButton} 
          onMouseLeave={this.hidePlayButton} 
          src={song.imageUrl} 
        />
        <div 
          id={`song-display-play-${song.id}`} 
          className='song-display-play' 
          onClick={this.handlePlayButton} 
          onMouseOver={this.showPlayButton} 
          onMouseLeave={this.showPlayButton} 
          onClick={this.handlePlayButton}
        >
          {this.playButtonContent()}
        </div> 
        <div className='song-display-info'>
          <div className='song-display-title' onClick={this.openSongShow}>{song.title}</div>
          <div className='song-display-user-name' onClick={this.linkToProfile}>{user.displayName}</div>
        </div>
      </div>
    )
  }
}