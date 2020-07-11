import React from 'react';
import CarouselItem from '../discover/carousel_item';
import { Link } from 'react-router-dom';

const LibrarySongs = ({ songs, users, overview, text, profile }) => {

  return (
    <div className='library-songs'>
      <div className={overview ? 'library-overview-subheader' : 'library-subheader'}>{profile ? '' : overview ? text : "Hear the tracks you've liked"}</div>    
      <div className='library-content'>
        {songs.length > 0 ?
          songs.map(song => {
            const user = users[song.userUrl];
            if (user) {
              return <CarouselItem song={song} user={user} key={song.id} />
            }
          }) :
          <div className='library-empty-content'>
            <div>There's nothing here. <Link to='/discover'>Browse music</Link></div>
          </div>
        }
      </div>
    </div>
  )
}

export default LibrarySongs;