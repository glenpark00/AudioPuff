import React from 'react';
import SongItem from '../song_item/song_item';
import ProfileUserHeader from './profile_user_header';
import UserEditFormModal from './user_edit_form_modal';
import SideBarProfileInfo from '../sidebar/sidebar_profile_info';
import SideBarSection from '../sidebar/sidebar_section';
import SideBarSongItem from '../sidebar/sidebar_song_item';
import SideBarUserItem from '../sidebar/sidebar_user_item';
import { FaPencilAlt, FaHeart, FaUserFriends } from 'react-icons/fa';

export default class CurrentUserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false
    }
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserSongs(this.props.currentUser.profileUrl);
  }

  handleCloseModal() {
    this.setState({ showEditModal: false })
  }

  render() {
    const { currentUser, songs, updateUser, users } = this.props;
    const userSongs = currentUser.songs ? currentUser.songs.map(songId => songs[songId]) : []
    const likedSongs = currentUser.likedSongs ? currentUser.likedSongs.map(songId => songs[songId]).filter(song => song) : [];
    const followings = currentUser.followings && users ? currentUser.followings.map(userId => users[userId]).filter(song => song) : [];

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
            <div className='page-full-content'>
              <div className='page-main-content'>
                <div className='profile-subheader-text'>Recent</div>
                <div className='index-recent-songs'>
                  {userSongs.map(song => (
                    <div className='song-index-key' key={song.id}>
                      <SongItem song={song} user={currentUser} />
                    </div>
                  ))}
                </div>
                <div className='profile-subheader-text'>Liked</div>
                <div className='index-recent-songs'>
                  {likedSongs.map(song => (
                    <div className='song-index-key' key={song.id}>
                      <SongItem song={song} user={currentUser} />
                    </div>
                  ))}
                </div>
              </div>
              <div className='side-bar'>
                <SideBarProfileInfo user={currentUser} />
                <SideBarSection icon={<FaHeart />} items={likedSongs} component={<SideBarSongItem />} text={`${likedSongs.length} likes`}/>
                <SideBarSection icon={<FaUserFriends />} items={followings} component={<SideBarUserItem />} text={`${followings.length} following`} />
                <div className='page-border-container'>
                  <div className='page-top-border'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <h1>User not found</h1>
    }
  }
}