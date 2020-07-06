import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
      [description, setDescription] = useState(song.description),
      [titleError, setTitleError] = useState(false),
      [urlError, setUrlError] = useState(false)

  const dispatch = useDispatch();

  const checkFields = () => {
    if (title === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (songUrl === '') {
      setUrlError(true);
    } else {
      setUrlError(false);
    }
  }

  const handleSubmit = () => {
    checkFields();
    if (title != '' && songUrl != '') {
      const formData = prepareForm();
      handleCloseModal()
        .then(() => {
          dispatch(updateSong(formData));
          history.push(`/${user.profileUrl}`);
          history.go();
        })
    }
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
    this.setState({
      title: '',
      songUrl: '',
      genre: '',
      description: ''
    })
    handleCloseModal();
  }

  return (
    <div className='song-form'>
      <h2>Basic Info</h2>
      <div className='song-create-form'>
        <SongShowUploadImage originalImageUrl={song.imageUrl} setImageFile={setImageFile} />
        <div className='song-info-form'>
          <div className='song-form-text'>Title</div>
          <input className='song-form-input' type="text" value={title} onChange={setTitle} />
          {titleError ? <div>You must provide a title</div> : ''}
          <div className='song-url-field'>
            <span className='song-url-static'>audiopuff.herokuapp.com/{user.profileUrl}/</span>
            <SongUploadSongUrl songUrl={songUrl} handleInput={setSongUrl} urlError={urlError} />
          </div>
          <div className='song-form-text'>Genre</div>
          <SongUploadGenre genre={genre} handleInput={setGenre} />
          <div className='song-form-text'>Description</div>
          <textarea className='song-input-textarea'
            value={description}
            onChange={setDescription}
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