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
    this.setState({ openEdit: true });
    window.addEventListener('click', this.closeEdit);
  }

  closeEdit() {
    this.setState({ openEdit: false });
    window.removeEventListener('click', this.closeEdit);
  }

  content() {
    if (this.state.openEdit) {
      return <input type="text" value={ this.props.songUrl } onChange={ this.props.handleInput('songUrl') } onClick={ e => e.stopPropagation() }/>
    } else {
      return <><strong>{ this.props.songUrl }</strong><button onClick={ this.openEdit }>Pencil</button></>
    }
  }

  render() {
    return this.content();
  }
}