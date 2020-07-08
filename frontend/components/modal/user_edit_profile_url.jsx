import React from 'react';

export default class UserEditProfileUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEdit: false
    }
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeEdit);
  }

  openEdit() {
    this.setState({ openEdit: true })
    window.addEventListener('click', this.closeEdit);
  }

  closeEdit() {
    this.setState({ openEdit: false });
    window.removeEventListener('click', this.closeEdit);
  }

  render() {
    if (this.state.openEdit) {
      return <input className='user-profile-url'
        type="text"
        value={this.props.profileUrl}
        onChange={e => this.props.handleInput(e.target.value)}
        onMouseUp={e => e.stopPropagation()} />
    } else {
      return (
        <>
          <div className='profile-url-dynamic'>{this.props.profileUrl}</div>
          <button className='profile-url-edit-button' onClick={this.openEdit}>&#9998;</button>
        </>
      )
    }
  }
}