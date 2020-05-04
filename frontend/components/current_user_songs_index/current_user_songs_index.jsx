import React from 'react';
import SongItemContainer from '../song_item/song_item_container';
import ProfileUserHeader from '../profile_user_header/profile_user_header';

export default class CurrentUserSongsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: this.props.currentUser.songs
    }
  }

  componentDidMount() {
    this.props.fetchUserSongs(this.props.currentUser.id).then(
      () => this.setState({ songs: this.props.currentUser.songs })
    )
  }

  render() {
    const { currentUser, songs } = this.props;
    if (currentUser) {
      return (
        <div className='current-user-profile-page'>
          <ProfileUserHeader user={currentUser} />
          <div>Recent</div>
          <div className='index-recent-songs'>
            { this.state.songs ?
              this.state.songs.map(songId => {
              let song = songs[songId]
              return (
                <div className='song-index-key' key={song.id}>
                  <SongItemContainer song={ song } user={ currentUser } />
                </div>
              )
            })
              : 'No tracks. Start uploading!'
            }
          </div>
        </div>
      )
    } else {
      return <h1>User not found</h1>
    }
  }
}