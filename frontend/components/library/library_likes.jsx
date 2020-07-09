import React from 'react';
import CarouselItem from '../discover/carousel_item';

const LibraryLikes = ({ songs, users, overview }) => {

  return (
    <div className='library-likes'>
      <div className={overview ? 'library-overview-subheader' : 'library-subheader'}>{overview ? 'Likes' : "Hear the tracks you've liked"}</div>    
      <div className='library-content'>
        { songs.map(song => {
          const user = users[song.userUrl];
          if (user) {
            return <CarouselItem song={song} user={user} key={song.id} />
          }
        })}
      </div>
    </div>
  )
}

export default LibraryLikes;