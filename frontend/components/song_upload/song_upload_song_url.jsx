import React from 'react';

export default class SongUploadSongUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEdit: false
    }
    this.input = React.createRef();
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

  componentWillUnmount() {
    window.removeEventListener('click', this.closeEdit);
  }

  render() {
    if (this.state.openEdit) {
      return <input className='song-info-url'
        type="text"
        value={this.props.songUrl}
        ref={this.input}
        onChange={e => this.props.handleInput(e.target.value)}
        onClick={e => e.stopPropagation()} />
    } else {
      return (
        <>
          <div className='song-url-dynamic'>{this.props.songUrl}</div>
          <button className='song-url-edit-button' onClick={this.openEdit}>&#9998;</button>
        </>
      )
    }
  }
}