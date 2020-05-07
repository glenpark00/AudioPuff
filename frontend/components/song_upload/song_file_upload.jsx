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
  }

  drop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files
    if (files && files[0] && files[0].size < 1500000) {
      this.handleAudioFile(files[0]);
    } else {
      alert('Invalid file type or file size too large')
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
   const files = e.target.files
    if (files && files[0] && files[0].size < 1500000) {
      this.handleAudioFile(files[0]);
    } else {
      alert('Invalid file type or file size too large')
    }
  }

  handleUploadClick() {
    document.querySelector('.hidden-upload').click();
  }

  render() {
    return (
      <div className='file-upload-background'>
        <div className='file-upload-area' 
             draggable='true' 
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
               onDrop={ this.drop }>
            <br/>
            <h3>Drop File to Upload</h3>
          </div>
        </div>
      </div>
    )
  }
}