import React from 'react';

export default class SongUploadSongUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEdit: false
    }
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  openEdit(e) {
    e.stopPropagation();
    window.addEventListener('click', this.closeEdit);
    this.setState({ openEdit: true });
  }

  closeEdit() {
    window.removeEventListener('click', this.closeEdit);
    this.setState({ openEdit: false });
  }

  content() {
    if (this.state.openEdit) {
      return <input className='song-info-url'
                    type="text" 
                    value={ this.props.songUrl } 
                    onChange={ this.props.handleInput('songUrl') } 
                    onClick={ e => e.stopPropagation() }/>
    } else {
      return (
        <>
          <strong className='song-url-static'>{ this.props.songUrl }</strong>
          <button className='song-url-edit-button' onClick={ this.openEdit }>&#9998;</button>
        </>
      )
    }
  }

  render() {
    return this.content();
  }
}