import React from 'react'
import SongUploadSongUrl from './song_upload_song_url';
import SongUploadGenre from './song_upload_genre';

export default class SongUploadForm extends React.Component {
  constructor(props) {
    super(props);
    // Have title eventually be autofilled with spaced and capitalized song file name and song_url will be file name
    this.state = {
      title: '',
      songUrl: 'sample',
      genre: 'None',
      description: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreateSong = this.handleCreateSong.bind(this);
  }

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value })
  }

  handleCreateSong() {
    this.props.createSong(this.state, this.props.currentUserId);
    this.props.history.push('/');
  }

  handleCancel() {
    this.setState({
      title: '',
      songUrl: 'sample',
      genre: '',
      description: ''
    })
  }

  render() {
    const { title, songUrl, genre, description } = this.state;
    return (
      <div>
        <h3>Song Information</h3>
        <span className='song-image-upload'>

        </span>
        <span>
          <label>Title
            <input type="text" value={ title } onChange={ this.handleInput('title') } />
          </label>
          <span>audiopuff.heroku.com/</span>
          <SongUploadSongUrl songUrl={ songUrl } handleInput={ this.handleInput } />
          <SongUploadGenre genre={ genre } handleInput={ this.handleInput } />
          <label>Description
            <textarea value={ description } onChange={ this.handleInput('description') } cols="30" rows="10"></textarea>
          </label>
        </span>
        <button onClick={ this.handleCancel }>Cancel</button>
        <button onClick={ this.handleCreateSong }>Save</button>
      </div>
    )
  }
}