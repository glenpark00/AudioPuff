import React from 'react';
import SongItemWaveform from './song_item_waveform';
import { timeElapsed } from '../../util/general_util';
import { FaPlay, FaPause } from 'react-icons/fa';

export default class SongShow extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlayButton = this.handlePlayButton.bind(this);
    this.playButtonContent = this.playButtonContent.bind(this);
    this.openSongShow = this.openSongShow.bind(this);
    this.linkToProfile = this.linkToProfile.bind(this);
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
    } else  {
      return <FaPlay />
    }
  }

  openSongShow() {
    this.props.history.push(`/${this.props.user.profileUrl}/${this.props.song.songUrl}`);
  }

  linkToProfile() {
    this.props.history.push(`/${this.props.user.profileUrl}`);
  }

  render() {
    const { song, user, currentSong, displayPlayer } = this.props;
    return (
      <div className='song-item'>
        <img className='song-item-image' onClick={ this.openSongShow } src={ song.imageUrl } />
        <div className='song-item-content'>
          <div className='song-item-play' onClick={ this.handlePlayButton }>{ this.playButtonContent() }</div>
          <div className='song-item-info'>
            <div className='song-item-info-top-line'>
              <div className='song-item-display-name' onClick={this.linkToProfile}>{ user.displayName }</div>
              <div className='song-time-elapsed'>{ timeElapsed(song.createdAt) }</div>
            </div>
            <div className='song-item-title'>{ song.title }</div>
            <SongItemWaveform currentSong={ currentSong } song={ song } displayPlayer={ displayPlayer } />
          </div>
        </div>
      </div>
    )
  }
}