import React from 'react';

export default class CurrentUserSongsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserSongs(this.props.currentUser.id)
  }

  playSong(songId) {
    this.props.displayGlobalAudioPlayer();
    this.props.fetchCurrentSongFileUrl(songId);
  }

  render() {
    const { currentUser, songs } = this.props;
    return (
      <div className='user-song-index'>
        { currentUser && currentUser.songs ? 
          currentUser.songs.map(songId => {
            let song = songs[songId]
            return (
              <div key={ song.id }>
                <img className='profile-song-image' src={ song.imageUrl } onClick={() => this.playSong(song.id)} />
                <strong>
                  { song.title }
                </strong>
              </div>
            )
          })
          : <h1>You don't have any songs. Start uploading now!</h1>
        }
      </div>
    )
  }
}