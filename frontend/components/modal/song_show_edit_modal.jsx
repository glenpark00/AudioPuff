import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongShowUploadImage from './song_show_upload_image';
import SongUploadSongUrl from '../song_upload/song_upload_song_url';
import SongUploadGenre from '../song_upload/song_upload_genre';
import { updateSong } from '../../actions/songs_actions';
import { withRouter } from 'react-router-dom';

const SongShowEditModal = ({ song, user, history, handleCloseModal }) => {
  const [imageFile, setImageFile] = useState(null),
    [title, setTitle] = useState(song.title),
    [songUrl, setSongUrl] = useState(song.songUrl),
    [genre, setGenre] = useState(song.genre),
    [description, setDescription] = useState(song.description ? song.description : ''),
    errors = useSelector(state => state.errors.songs),
    originalSongUrl = song.songUrl,
    dispatch = useDispatch();

  const forbiddenUrls = ['likes', 'reposts', 'related'];

  const checkErrors = () => {
    const res = {};
    if (forbiddenUrls.includes(songUrl)) {
      res.url = 'Song url invalid'
    }

    if (!errors || errors === []) return res;
    
    errors.map(err => {
      if (err.includes('Title')) {
        res.title = err;
      } else if (err.includes('Song url')) {
        res.url = err;
      }
    })
    return res;
  }

  const handleSubmit = () => {
    const formData = prepareForm();
    dispatch(updateSong(formData, originalSongUrl))
      .then(() => {
        handleCloseModal();
        if (originalSongUrl !== songUrl) {
          history.push(`/${user.profileUrl}/${songUrl}`);
        }
      })
  }

  const prepareForm = () => {
    const formData = new FormData();
    formData.append('song[id]', song.id)
    formData.append('song[imageFile]', imageFile);
    formData.append('song[title]', title);
    formData.append('song[title]', title);
    formData.append('song[songUrl]', songUrl);
    formData.append('song[genre]', genre);
    formData.append('song[description]', description);
    return formData;
  }

  const handleCancel = () => {
    handleCloseModal();
  }

  const errs = checkErrors();

  return (
    <div className='song-form'>
      <h2>Basic Info</h2>
      <div className='song-create-form'>
        <SongShowUploadImage originalImageUrl={song.imageUrl} setImageFile={setImageFile} />
        <div className='song-info-form'>
          <div className='song-form-text'>Title</div>
          <input className='song-form-input' type="text" value={title} onChange={e => setTitle(e.target.value)} />
          <div className='song-upload-error'>{errs.title}</div>
          <div className='song-url-field'>
            <span className='song-url-static'>audiopuff.herokuapp.com/{user.profileUrl}/</span>
            <SongUploadSongUrl songUrl={songUrl} handleInput={setSongUrl} />
          </div>
          <div className='song-upload-error'>{errs.url}</div>
          <div className='song-form-text'>Genre</div>
          <SongUploadGenre genre={genre} handleInput={e => setGenre(e.target.value)} />
          <div className='song-form-text'>Description</div>
          <textarea className='song-input-textarea'
            value={description}
            onChange={e => setDescription(e.target.value)}
            cols="30" rows="10"
            placeholder='Describe your track'></textarea>
        </div>
      </div>
      <div className='create-song-buttons'>
        <button className='cancel-song-button' onClick={handleCancel}>Cancel</button>
        <button className='save-song-button' onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default withRouter(SongShowEditModal);