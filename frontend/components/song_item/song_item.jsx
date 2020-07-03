import React from 'react';
import SongItemWaveform from './song_item_waveform';
import LikeButton from '../like_button';
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
    const { audio, song, displayGlobalAudioPlayer, fetchCurrentSongFileUrl, playAudio, pauseAudio } = this.props;
    if (audio.playing && song.id === audio.currentSong.id) {
      const globalAudio = document.querySelector('.global-audio-player');
      globalAudio.pause();
      pauseAudio();
    } else {
      if (audio.currentSong.id === song.id) {
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
    const { song, user, audio, displayPlayer, changeCurrentTime, fetchCurrentSongFileUrl, displayGlobalAudioPlayer } = this.props;
    return (
      <div className='song-item'>
        <img className='song-item-image' onClick={ this.openSongShow } src={ song.imageUrl } />
        <div className='song-item-content-container'>
          <div className='song-item-content'>
            <div className='song-item-play' onClick={ this.handlePlayButton }>{ this.playButtonContent() }</div>
            <div className='song-item-info'>
              <div className='song-item-info-top-line'>
                <div className='song-item-display-name' onClick={this.linkToProfile}>{ user.displayName }</div>
                <div className='song-time-elapsed'>{ timeElapsed(song.createdAt) }</div>
              </div>
              <div className='song-item-title' onClick={this.openSongShow}>{ song.title }</div>
            </div>
          </div>
          <SongItemWaveform 
            audio={ audio }
            song={ song }
            displayPlayer={ displayPlayer }
            displayGlobalAudioPlayer={ displayGlobalAudioPlayer }
            fetchCurrentSongFileUrl={fetchCurrentSongFileUrl }
            changeCurrentTime={ changeCurrentTime }
            item={true} />
          <div className='like-button-border'>
            <LikeButton song={song} text={song.likers.length} />
          </div>  
        </div>
      </div>
    )
  }
}