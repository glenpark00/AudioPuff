import React from 'react';
import SongFileUpload from './song_file_upload';
import SongUploadFormContainer from './song_upload_form_container';

export default class SongUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFile: null,
      duration: null
    }
    this.setAudioFile = this.setAudioFile.bind(this);
  }

  setAudioFile(audioFile, duration) {
    this.setState({ audioFile, duration })
  }

  content() {
    if (!this.state.audioFile) {
      return <SongFileUpload setAudioFile={ this.setAudioFile } />
    } else {
      return <SongUploadFormContainer audioFile={ this.state.audioFile } duration={ this.state.duration } setAudioFile={ this.setAudioFile } />
    }
  }

  render() {
    return this.content();
  }
}