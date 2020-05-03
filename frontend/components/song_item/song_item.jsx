import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default class SongShow extends React.Component {
  constructor(props) {
    super(props);
    this.playSong = this.playSong.bind(this);
    this.openSongShow = this.openSongShow.bind(this);
    this.timeElapsed = this.timeElapsed.bind(this);
  }

  // Maybe you can make a container for this component so you don't have to connect state to so many components (you'll have to add withRouter tho, remmeber that)
  // playSong(songId) {
  //   this.props.displayGlobalAudioPlayer();
  //   this.props.fetchCurrentSongFileUrl(songId);
  // }

  // openSongShow(e) {
  //   this.props.history.push(`/${this.props.user.profileUrl}/${this.props.song.songUrl}`)
  // }

  timeElapsed() {
    const datetime = new Date(this.props.song.createdAt);
    const now = new Date().getTime();
    if (isNaN(datetime)) {
      return ' on ' + datetime;
    }

    if (datetime < now) {
      var milisec_diff = now - datetime;
    } else {
      var milisec_diff = datetime - now;
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
    var hours = Math.floor(milisec_diff / (1000 * 60 * 60) - days * 24);
    var minutes = Math.floor(milisec_diff / (1000 * 60) - days * 24 * 60 - hours * (60));
    var res = '';
    if (days === 1) {
      return '1 day ago'
    }
    if (days > 1) {
      return (days + ' days ago');
    }
    if (hours === 1) {
      return (hours + ' hour ago');
    }
    if (hours > 1) {
      return (hours + ' hours ago')
    }
    if (minutes === 1) {
      return (minutes + ' minute ago');
    }
    if (minutes >= 0) {
      return (minutes + 'minutes ago')
    }
    return 'no date'
  }

  playSong(songId) {
    this.props.displayGlobalAudioPlayer();
    this.props.fetchCurrentSongFileUrl(songId);
  }

  openSongShow(e) {
    this.props.history.push(`/${this.props.user.profileUrl}/${this.props.song.songUrl}`);
  }

  render() {
    const { song, user } = this.props;
    return (
      <div className='song-item'>
        <img className='song-item-image' onClick={ this.openSongShow } src={ song.imageUrl } />
        <div className='song-item-content'>
          <div className='song-item-play' onClick={() => this.playSong(song.id)}>{this.props.currentSong === song.fileUrl ? <FaPlay /> : <FaPause /> }</div>
          <div className='song-item-info'>
            <div className='song-item-info-top-line'>
              <div className='song-item-display-name'>{user.displayName}</div>
              <div className='song-time-elapsed'>{ this.timeElapsed() }</div>
            </div>
            <div className='song-item-title'>{song.title}</div>
          </div>
        </div>
      </div>
    )
  }
}