import React from 'react';
import SongShowUploadImage from './song_show_upload_image';
import SongUploadSongUrl from '../song_upload/song_upload_song_url';
import SongUploadGenre from '../song_upload/song_upload_genre';
import { withRouter } from 'react-router-dom';

class SongShowEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      title: this.props.song.title,
      songUrl: this.props.song.songUrl,
      genre: this.props.song.genre,
      description: this.props.song.description,
      titleError: false,
      urlError: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEditSong = this.handleEditSong.bind(this);
    this.setImageFile = this.setImageFile.bind(this);
  }

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value })
  }

  setImageFile(imageFile) {
    this.setState({ imageFile })
  }

  checkFields() {
    if (this.state.title === '') {
      this.setState({ titleError: true })
    } else {
      this.setState({ titleError: false })
    }
    if (this.state.songUrl === '') {
      this.setState({ urlError: true })
    } else {
      this.setState({ urlError: false })
    }
  }

  handleEditSong() {
    this.checkFields();
    if (this.state.title != '' && this.state.songUrl != '') {
      const formData = this.prepareForm();
      this.props.updateSong(formData);
      this.props.history.push(`/${this.props.user.profileUrl}`);
    }
  }

  prepareForm() {
    const formData = new FormData();
    const { imageFile, title, songUrl, genre, description } = this.state;
    formData.append('song[id]', this.props.song.id)
    formData.append('song[imageFile]', imageFile);
    formData.append('song[title]', title);
    formData.append('song[title]', title);
    formData.append('song[songUrl]', songUrl);
    formData.append('song[genre]', genre);
    formData.append('song[description]', description);
    return formData;
  }

  handleCancel() {
    this.setState({
      title: '',
      songUrl: '',
      genre: '',
      description: ''
    })
    this.props.closeModal('showEditModal');
  }

  render() {
    const { title, songUrl, genre, description, closeModal } = this.state;
    return (
      <div className='song-form'>
        <h2>Basic Info</h2>
        <div className='song-create-form'>
          <SongShowUploadImage originalImageUrl={this.props.song.imageUrl} setImageFile={this.setImageFile} />
          <div className='song-info-form'>
            <div className='song-form-text'>Title</div>
            <input className='song-form-input' type="text" value={title} onChange={this.handleInput('title')} />
            {this.state.titleError ? <div>You must provide a title</div> : ''}
            <div className='song-url-field'>
              <span className='song-url-static'>audiopuff.herokuapp.com/{this.props.user.profileUrl}/</span>
              <SongUploadSongUrl songUrl={songUrl} handleInput={this.handleInput} urlError={this.state.urlError} />
            </div>
            <div className='song-form-text'>Genre</div>
            <SongUploadGenre genre={genre} handleInput={this.handleInput} />
            <div className='song-form-text'>Description</div>
            <textarea className='song-input-textarea'
              value={description}
              onChange={this.handleInput('description')}
              cols="30" rows="10"
              placeholder='Describe your track'></textarea>
          </div>
        </div>
        <div className='create-song-buttons'>
          <button className='cancel-song-button' onClick={closeModal}>Cancel</button>
          <button className='save-song-button' onClick={this.handleEditSong}>Save</button>
        </div>
      </div>
    )
  }
}

export default withRouter(SongShowEditModal);