import React from 'react';
import SongDisplayItemContainer from '../song_display_item/song_display_item_container';
import Footer from '../footer';

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: null
    }
  }

  componentDidMount() {
    this.props.fetchNSongs(5).then(action => this.setState({ songs: Object.values(action.data.songs) }));
  }

  render() {
    const { users } = this.props;
    if (!this.state.songs) return null;
    return (
      <div className='discover-page-background'>
        <div className='discover-page'>
          <div className='discover-heading-container'>
            <h2 className='discover-header'>New Music Now</h2>
            <div className='discover-subheader'>The latest hits, updated all the time</div>
          </div>
          <div className='new-songs-index'>
            {this.state.songs.map(song =>
              <div key={song.id}>
                <SongDisplayItemContainer song={song} user={users[song.userUrl]} />
              </div>
            )}
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}