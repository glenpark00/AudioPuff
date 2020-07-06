import React from 'react';
import SongItem from '../song_item/song_item';
import { deleteSong } from '../../actions/songs_actions';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SongShowDeleteModal = ({ song, user, history, handleCloseModal }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSong(song.id));
    handleCloseModal();
    history.push(`/${user.profileUrl}`);
  }

  return (
    <div className='delete-song-modal'>
      <SongItem song={song} user={user}/>
      <div className='delete-song-separator'></div>
      <div className='delete-song-subheader'>Permanently delete this track?</div>
      <div className='delete-song-info'>
        <div className='delete-song-warning'>Removing this track is irreversible. You will lose all the plays, likes and comments for this track with no way to get them back.</div>
        <div className='delete-song-buttons'>
          <div className='delete-song-cancel' onClick={handleCloseModal}>Cancel</div>
          <div className='delete-song-button' onClick={handleDelete}>Delete forever</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(SongShowDeleteModal);