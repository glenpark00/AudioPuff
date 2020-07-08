import React from 'react';
import SongItem from '../song_item/song_item';
import SearchUserItem from './search_user_item';

export default class SearchEverything extends React.Component {

  render() {
    const { users, songs, songUsers } = this.props;
    // const everything = users.concat(songs);
    // for (let i = everything.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * i)
    //   const temp = everything[i]
    //   everything[i] = everything[j]
    //   everything[j] = temp
    // }
    // const everything = [];
    // for (let i = 0; i < users.length + songs.length - 1; i++) {
    //   if ()
    //   if ((i + 1) % 3 === 0) {
    //     everything
    //   }
    // }

    return (
      <div>
        <div>Found {songs.length} tracks, {users.length} people</div>
        <div>
          {everything.map(el => {
            if (el.displayName) {
              return <SearchUserItem user={el} />
            } else {
              const user = songUsers[el.userUrl]
              return <SongItem song={el} user={user} />
            }
          })}
        </div>
      </div>
    )
  }
}