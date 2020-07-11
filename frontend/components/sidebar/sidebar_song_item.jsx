import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LikeButton from '../like_button';
import PlayButton from '../play_button';
import { FaHeart } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

const SideBarSongItem = ({ item, history }) => {
  const user = useSelector(state => state.entities.users[item.userUrl]);
  const audio = useSelector(state => state.audio);
  const [hovering, setHovering] = useState(false);

  const playing = audio.playing && audio.currentSong.id === item.id;

  if (!user) return null;

  return (
    <div 
      className='side-bar-song-item' 
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div>
        <img className='side-bar-song-img' src={item.imageUrl} alt="sidebar-song"/>
        { hovering || playing ?
          <PlayButton song={item} type='side-bar' /> : null
        }
      </div>
      <div className='side-bar-song-content'>
        <div 
          className='side-bar-song-text' 
          onClick={() => history.push(`/${user.profileUrl}`)}>{user.displayName}</div
        >
        <div className='side-bar-song-middle'>
          <div 
            className='side-bar-song-text' 
            style={playing ? { color: '#CE1141' } : {}}
            onClick={() => history.push(`/${user.profileUrl}/${item.songUrl}`)}
          >
            {item.title}
          </div>
          { hovering || playing ?
            <div className='like-button-border'>
              <LikeButton song={item} />
            </div>
            : null
          }
        </div>
        <div className='side-bar-song-likers'>
          <FaHeart />
          <div>{item.likers.length}</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(SideBarSongItem);