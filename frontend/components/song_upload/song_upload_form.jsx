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
      waveform: null,
      titleError: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreateSong = this.handleCreateSong.bind(this);
    this.setImageFile = this.setImageFile.bind(this);
  }

  componentDidMount() {
    this.createSongWaveform(this.state.audioFile)
  }

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value })
  }

  setImageFile(imageFile) {
    this.setState({ imageFile })
  }

  // createSongWaveform(audioFile) {
  //   window.AudioContext = window.AudioContext || window.webkitAudioContext;
  //   const audioContext = new AudioContext();
  //   audioFile.arrayBuffer()
  //     .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  //     .then(audioBuffer => this.setState({ waveform: this.drawWaveform(this.normalizeData(this.filterData(audioBuffer))) }, () => {
  //       let can = this.state.waveform;
  //       can.style.filter = 'invert(17%) sepia(86%) saturate(6300%) hue-rotate(330deg) brightness(80%) contrast(99%)'
  //       document.querySelector('.song-form-background').append(can);
  //     }))
  // }

  createSongWaveform(audioFile) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    audioFile.arrayBuffer()
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => this.setState({ waveform: this.drawWaveform(this.normalizeData(this.filterData(audioBuffer))) }))
  }


  filterData(audioBuffer) {
    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    const samples = 200; // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      let blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    return filteredData;
  };

  normalizeData(filteredData) {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map(n => n * multiplier);
  }

  drawWaveform(data) {
    const canvas = document.createElement('canvas');
    canvas.width = '820';
    canvas.height = '90';
    const ctx = canvas.getContext('2d');
    ctx.translate(0, canvas.height / 2);
    let width = canvas.width / data.length;
    data.forEach((point, i) => {
      let height = point * canvas.height;
      let x = i * width;
      let y = height / -2;
      ctx.fillStyle = '#d3d3d3';
      ctx.fillRect(x, y, width, height);
    })
    return canvas.toDataURL();
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

  prepareForm() {
    const formData = new FormData();
    const { audioFile, waveform, duration, imageFile, title, songUrl, genre, description } = this.state;
    if (imageFile) formData.append('song[imageFile]', imageFile);
    this.createSongWaveform(audioFile);
    formData.append('song[audioFile]', audioFile);
    formData.append('song[waveform]', waveform);
    formData.append('song[duration]', duration);
    formData.append('song[title]', title);
    formData.append('song[title]', title);
    formData.append('song[songUrl]', songUrl);
    formData.append('song[genre]', genre);
    formData.append('song[description]', description);
    return formData;
  }

  handleCreateSong() {
    this.checkFields();
    if (this.state.title != '' && this.state.songUrl != '') {
      const formData = this.prepareForm();
      this.props.createSong(formData).then(
        () => this.props.history.push(`/${this.props.currentUser.profileUrl}/${this.state.songUrl}`)
      );
    }
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
            <SongUploadImage setImageFile={ this.setImageFile } />
            <div className='song-info-form'>
              <div className='song-form-text'>Title</div>
              <input className='song-form-input' type="text" value={title} onChange={this.handleInput('title')} />
              { this.state.titleError ? <div>You must provide a title</div> : '' }
              <div className='song-url-field'>
                <span className='song-url-static'>audiopuff.herokuapp.com/{this.props.currentUser.profileUrl}/</span>
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
            <button className='cancel-song-button' onClick={ this.handleCancel }>Cancel</button>
            <button className='save-song-button' onClick={ this.handleCreateSong }>Save</button>
          </div>
        </div>
      </div>
    )
  }
}