import React from 'react';
import SongItemContainer from '../song_item/song_item_container';
import ProfileUserHeader from '../profile_user_header/profile_user_header';
import FollowButton from '../follow_button';
import { withRouter } from 'react-router-dom';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserSongs(this.props.match.params.profileUrl)
  }

  render() {
    const { user, songs } = this.props;
    if (!user) return <h1>User not found</h1>
    return (
      <div className='current-user-profile-background'>
        <div className='current-user-profile-page'>
          <ProfileUserHeader user={user} />
          <div className='profile-page-buttons'>
            <FollowButton user={user} />
          </div>
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
  }
}

export default withRouter(ProfilePage);