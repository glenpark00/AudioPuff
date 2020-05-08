import React from 'react';
import SongItemContainer from '../song_item/song_item_container';
import ProfileUserHeader from '../profile_user_header/profile_user_header';
import UserEditFormModal from './user_edit_form_modal';
import { FaPencilAlt } from 'react-icons/fa';

export default class CurrentUserSongsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false
    }
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserSongs(this.props.currentUser.id);
  }

  handleCloseModal() {
    this.setState({ showEditModal: false })
  }

  render() {
    const { currentUser, songs, updateUser } = this.props;
    if (currentUser) {
      return (
        <div className='current-user-profile-background'>
          { this.state.showEditModal ? 
            <div className="modal-background" onClick={this.handleCloseModal}>
              <div className="modal-child" onClick={e => e.stopPropagation()}>
                <UserEditFormModal user={ currentUser } handleCloseModal={ this.handleCloseModal } updateUser={ updateUser } />
              </div>
            </div>
            : null
          }
          <div className='current-user-profile-page'>
            <ProfileUserHeader user={currentUser} />
            <div className='current-user-buttons'>
              <div className='user-info-edit-button' onClick={ () => this.setState({ showEditModal: true }) }><FaPencilAlt /> Edit</div>
            </div>
            <div className='profile-subheader-text'>Recent</div>
            <div className='index-recent-songs'>
              {currentUser.songs ?
                currentUser.songs.map(songId => {
                  let song = songs[songId];
                  if (song) return (
                    <div className='song-index-key' key={song.id}>
                      <SongItemContainer song={song} user={currentUser} />
                    </div>
                  )
                })
                : null
              }
            </div>
          </div>
        </div>
      )
    } else {
      return <h1>User not found</h1>
    }
  }
}