import React from 'react';

export default class SongFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.drop = this.drop.bind(this);
    this.enterDrag = this.enterDrag.bind(this);
    this.exitDrag = this.exitDrag.bind(this);
    this.handleButtonUpload = this.handleButtonUpload.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleAudioFile = this.handleAudioFile.bind(this);
    this.checkFile = this.checkFile.bind(this);
  }

  drop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (this.checkFile(files)) {
      this.handleAudioFile(files[0]);
    }
    this.exitDrag(e);
  }

  enterDrag(e) {
    e.preventDefault();
    document.querySelector('.file-upload-overlay').style.display = 'flex';
  }

  exitDrag(e) {
    e.preventDefault();
    document.querySelector('.file-upload-overlay').style.display = 'none';
  }

  allowDrop(e) {
    e.preventDefault();
  }

  handleAudioFile(file) {
    const hiddenAudio = document.createElement('audio');
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      hiddenAudio.src = fileReader.result
    }
    fileReader.readAsDataURL(file);
    hiddenAudio.addEventListener('loadedmetadata', () => {
      this.props.setAudioFile(file, Math.trunc(hiddenAudio.duration));
    })
  }

  handleButtonUpload(e) {
    const files = e.target.files;
    if (this.checkFile(files)) {
      this.handleAudioFile(files[0]);
    }
  }

  handleUploadClick() {
    document.querySelector('.hidden-upload').click();
  }

  checkFile(files) {
    if (!files || !files[0]) {
      return false;
    }
    if (files[0].type !== 'audio/mpeg') {
      alert('Invalid file, please upload an audio file (.mp3 is ideal)');
      return false;
    };
    if (files[0].size > 6291456) {
      alert('File too large. Please upload a file less than 6MB');
      return false;
    };
    return true;
  } 

  render() {
    return (
      <div className='file-upload-background'>
        <div className='file-upload-area' 
          onDragEnter={ this.enterDrag }
        > 
          <div className='upload-area-text'>Drag and drop your tracks here</div>
          <br/>
          <input className= 'hidden-upload' type="file" onChange={ this.handleButtonUpload } />
          <audio className='hidden-audio'></audio>
          <button className='upload-button' onClick={ this.handleUploadClick }>or choose files to upload</button>
          <div className='file-upload-overlay'
               onDragOver={ this.allowDrop }
               onDragLeave={ this.exitDrag }
               onDrop={ this.drop }
          >
            <br/>
            <h3>Drop File to Upload</h3>
          </div>
        </div>
      </div>
    )
  }
}