import React from 'react'
import SongUploadSongUrl from './song_upload_song_url';
import SongUploadGenre from './song_upload_genre';
import SongUploadImage from './song_upload_image';

export default class SongUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFile: this.props.audioFile,
      duration: this.props.duration,
      imageFile: null,
      title: this.props.audioFile.name.split('.')[0],
      songUrl: this.props.audioFile.name.split('.')[0],
      genre: 'None',
      description: '',
      titleError: false,
      imageError: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreateSong = this.handleCreateSong.bind(this);
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
    if (this.state.imageFile === null) {
      this.setState({ imageError: true })
    } else {
      this.setState({ imageError: false })
    }
  }

  handleCreateSong() {
    this.checkFields();
    if (this.state.title != '' && this.state.imageFile != null) {
      const formData = this.prepareForm();
      this.props.createSong(formData);
      this.props.history.push(`/${this.props.currentUser.profileUrl}`);
    }
  }

  prepareForm() {
    const formData = new FormData();
    const { audioFile, duration, imageFile, title, songUrl, genre, description } = this.state;
    formData.append('song[audioFile]', audioFile);
    formData.append('song[duration]', duration)
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
      file: null,
      title: '',
      songUrl: '',
      genre: '',
      description: ''
    })
    this.props.setAudioFile(null);
  }

  render() {
    const { title, songUrl, genre, description } = this.state;
    return (
      <div className='song-form-background'> 
        <div className='song-form'>
          <h2>Basic Info</h2>
          <div className='song-create-form'>
            <SongUploadImage setImageFile={ this.setImageFile } imageError={ this.state.imageError } />
            <div className='song-info-form'>
              <label>Title
                <input className='song-info-title' type="text" value={title} onChange={this.handleInput('title')} />
                { this.state.titleError ? <div>You must provide a title</div> : '' }
              </label>
              <div className='song-url-field'>
                <span className='song-url-static'>audiopuff.herokuapp.com/{this.props.currentUser.profileUrl}/</span>
                <SongUploadSongUrl songUrl={songUrl} handleInput={this.handleInput} />
              </div>
              <label>Genre
                <SongUploadGenre genre={genre} handleInput={this.handleInput} />
              </label>
              <label>Description
              <textarea className='song-input-textarea'
                        value={description} 
                        onChange={this.handleInput('description')} 
                        cols="30" rows="10"
                        placeholder='Describe your track'></textarea>
              </label>
            </div>
          </div>
          <div className='create-song-buttons'>
            <button className='cancel-song-button' onClick={ this.handleCancel }>Cancel</button>
            <button className='save-song-button' onClick={ this.handleCreateSong }>Save</button>
          </div>
        </div>
      </div>
    )
  }
}