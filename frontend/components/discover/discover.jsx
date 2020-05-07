import React from 'react';
import SongDisplayItemContainer from '../song_display_item/song_display_item_container';

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllSongs();
  }

  render() {
    const { songs, users } = this.props;
    return (
      <div className='discover-page-background'>
        <div className='discover-page'>
          {songs.map(song =>
            <div key={song.id}>
              <SongDisplayItemContainer song={song} user={users[song.userId]} />
            </div>
          )}
        </div>
      </div>
    )
  }
}