import React from 'react';
import SongItem from '../song_item/song_item';;

export default class SearchSongs extends React.Component {

  render() {
    const { songs, songUsers } = this.props;

    return (
      <div className='search-results-items'>
        <h2>Found {songs.length} tracks</h2>
        <div>
          { songs.map(song => {
            const user = songUsers[song.userUrl]
            return <SongItem song={song} songs={songs.map(s => s.id)} user={user} key={`search-result-${Math.floor(Math.random() * 10000)}`} />
          })}
        </div>
      </div>
    )
  }
}