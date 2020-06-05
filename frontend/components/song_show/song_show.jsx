import React from 'react';
import SongItemWaveform from '../song_item/song_item_waveform';
import { timeElapsed } from '../../util/general_util'; 
import SongShowEditModal from './song_show_edit_modal';
import SongShowDeleteModal from './song_show_delete_modal'
import { FaPlay, FaPause, FaTrash, FaPencilAlt } from 'react-icons/fa';
import Footer from '../footer';

export default class SongShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showDeleteModal: false
    }
    this.handlePlayButton = this.handlePlayButton.bind(this);
    this.playButtonContent = this.playButtonContent.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.linkToProfile = this.linkToProfile.bind(this);
  }

  componentDidMount() {
    const { fetchSongFromUrl, match } = this.props;
    fetchSongFromUrl(match.params.songUrl, match.params.profileUrl);
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

  linkToProfile() {
    this.props.history.push(`/${this.props.user.profileUrl}`);
  }

  closeModal(type) {
    this.setState({ [type]: false })
  }

  render() {
    const { song, user } = this.props;
    if (!song || !user) return null; 
    return (
      <div className='song-show-page-background'>
        <div className='song-show-page'>
          { this.state.showEditModal ? 
            <div className="modal-background" onClick={ () => this.setState({ showEditModal: false }) }>
              <div className="modal-child" onClick={e => e.stopPropagation()}>
                <div className ='modal-top-space'></div>
                <SongShowEditModal song={song} user={user} updateSong={this.props.updateSong} closeModal={this.closeModal} />
              </div>
            </div>
            : null
          }
          { this.state.showDeleteModal ?
            <div className="modal-background" onClick={ () => this.setState({ showDeleteModal: false }) }>
              <div className="modal-child" onClick={e => e.stopPropagation()}>
                <SongShowDeleteModal song={song} user={user} deleteSong={this.props.deleteSong} closeModal={this.closeModal} />
              </div>
            </div>
            : null
          }
          <div className='song-show-header'>
            <div className='song-show-info-container'>
              <div className='song-show-play' onClick={this.handlePlayButton}>{this.playButtonContent()}</div>
              <div className='song-show-info'>
                <div className='song-show-upper'> 
                  <div className='song-show-info-top-line'>
                    <div className='song-show-display-name' onClick={this.linkToProfile}>{ user.displayName }</div>
                    <div className='song-show-time-elapsed'>{ timeElapsed(song.createdAt) }</div>
                  </div>
                  <div className='song-show-title-container'>
                    <div className='song-show-title'>{song.title}</div>
                    <div className='song-show-genre'>#{song.genre}</div>
                  </div>
                </div>
                <SongItemWaveform currentSong={this.props.currentSong} song={song} displayPlayer={this.props.displayPlayer} />
              </div>
              <img src={ song.imageUrl } className='song-show-image' />
            </div>
          </div>
          {this.props.currentUserUrl === user.profileUrl ?
            <div className='user-song-item-buttons'>
              <div className='user-song-item-button' onClick={ () => this.setState({ showEditModal: true }) }>{ <FaPencilAlt /> } Edit</div>
              <div className='user-song-item-button' onClick={() => this.setState({ showDeleteModal: true })}>{ <FaTrash /> } Delete track</div>
            </div>
            : null
          }
        </div>
        <Footer></Footer>
      </div>
    )
  }
}