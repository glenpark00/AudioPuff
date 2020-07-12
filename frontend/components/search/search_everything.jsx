import React from 'react';
import SongItem from '../song_item/song_item';
import SearchUserItem from './search_user_item';

export default class SearchEverything extends React.Component {

  render() {
    const { songs, users, shuffledIndices, songUsers } = this.props;

    const everything = songs.concat(users);

    return (
      <div className='search-results-items'>
        <h2>Found {songs.length} tracks, {users.length} people</h2>
        <div>
          {shuffledIndices.map(i => {
            const el = everything[i];
            if (!el) return null;
            if (el.displayName) {
              return <SearchUserItem user={el} key={`search-result-${Math.floor(Math.random() * 10000)}`} />
            } else if (el.title && songUsers[el.userUrl]) {
              return <SongItem song={el} songIds={songs.map(song => song.id)} user={songUsers[el.userUrl]} key={`search-result-${Math.floor(Math.random() * 10000)}`} />
            } else {
              return null;
            }
          })}
        </div>
      </div>
    )
  }
}