import React from 'react';
import SongItemContainer from '../song_item/song_item_container';
import ProfileUserHeader from '../profile_user_header/profile_user_header';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.props.fetchUserByProfileUrl(this.props.userProfileUrl).then(user => this.setState({ user }, () => this.props.fetchUserSongs(this.state.user.id)))
  }

  render() {
    const { songs } = this.props;
    const { user } = this.state;
    if (user) {
      return (
        <div className='current-user-profile-background'>
          <div className='current-user-profile-page'>
            <ProfileUserHeader user={user} />
            <div className='profile-subheader-text'>Recent</div>
            <div className='index-recent-songs'>
              {user.songs ?
                user.songs.map(songId => {
                  let song = songs[songId];
                  if (song) return (
                    <div className='song-index-key' key={song.id}>
                      <SongItemContainer song={song} user={user} />
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