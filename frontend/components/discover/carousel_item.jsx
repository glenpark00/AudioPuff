import React, { useState } from 'react';
import LikeButton from '../like_button';
import PlayButton from '../play_button';
import { withRouter } from 'react-router-dom';

function CarouselItem({ song, songIds, user, history, incrementCount }) {
  const [hovering, setHovering] = useState(false);

  const openSongShow = () => history.push(`/${user.profileUrl}/${song.songUrl}`);

  if (!song || !user) return null;
  return (
    <div className='song-carousel-item' >
      <div className='song-carousel-image-container'>
        <img 
          className='song-carousel-image' 
          onClick={openSongShow} 
          onMouseEnter={() => setHovering(true)} 
          onMouseLeave={() => setHovering(false)} 
          onLoad={incrementCount}
          src={song.imageUrl} 
        />
        { hovering ? 
          <div 
            className='song-carousel-overlay'
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)} 
          >
            <PlayButton song={song} songIds={songIds} type='carousel' />
            <LikeButton song={song} />
          </div>
          : null
        }
      </div>
      <div className='song-carousel-info'>
        <div className='song-carousel-title' onClick={openSongShow}>{song.title}</div>
        <div className='song-carousel-user-name' onClick={() => history.push(`/${user.profileUrl}`)}>{user.displayName}</div>
      </div>
    </div>
  )
}

export default withRouter(CarouselItem);