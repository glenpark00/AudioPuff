import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SongItemWaveform from './song_item_waveform';
import PlayButton from '../play_button';
import LikeButton from '../like_button';
import { enableModalDisplay } from '../../actions/ui_actions';
import { timeElapsed } from '../../util/general_util';
import { withRouter } from 'react-router-dom';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

const SongItem = ({ song, user, audio, history }) => {
  const currentUserUrl = useSelector(state => state.session.currentUserUrl),
    dispatch = useDispatch(),
    openModal = type => dispatch(enableModalDisplay({ type, data: { song, user } }));

  return (
    <div className='song-item'>
      <img 
        className='song-item-image' 
        src={song.imageUrl}
        onClick={() => history.push(`/${user.profileUrl}/${song.songUrl}`)}
      />
      <div className='song-item-content-container'>
        <div className='song-item-content'>
          <PlayButton song={song} type='item' />
          <div className='song-item-info'>
            <div className='song-item-info-top-line'>
              <div 
                className='song-item-display-name' 
                onClick={() => history.push(`/${user.profileUrl}`)}
              >
                {user.displayName}
              </div>
              <div className='song-time-elapsed'>{timeElapsed(song.createdAt)}</div>
            </div>
            <div className='song-item-info-bottom-line'>
              <div 
                className='song-item-title' 
                onClick={() => history.push(`/${user.profileUrl}/${song.songUrl}`)}
              >
                {song.title}
              </div>
              { song.genre !== 'None' ?
                <div className='song-item-genre'>#{song.genre}</div>
                : null
              }
            </div>
          </div>
        </div>
        <SongItemWaveform 
          audio={audio}
          song={song}
          item={true} />
        <div className='song-item-buttons'>
          <div className='like-button-border'>
            <LikeButton 
              song={song}
              text={song.likers.length > 0 ? song.likers.length : 'Like'} 
          />
          </div>
          {currentUserUrl === user.profileUrl ?
            (
              <>
                <div className='song-item-button' onClick={() => openModal('songEdit')} > 
                  {<FaPencilAlt />} Edit
                </div>
                <div className='song-item-button' onClick={() => openModal('songDelete')}>
                  {<FaTrash />} Delete track
                </div>
              </>
            ) : null
          }  
        </div>
      </div>
    </div>
  )
}

export default withRouter(SongItem);