import React from 'react';

export default class SignupFormStep3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: ''
    }
    this.changeDisplayName = this.changeDisplayName.bind(this);
  }

  changeDisplayName() {
    const { updateUser, user, handleCloseModal } = this.props;
    const formData = new FormData();
    formData.append('user[id]', user.id);
    formData.append('user[displayName]', this.state.displayName)
    updateUser(Object.assign(formData, user.profileUrl, []))
      .then(() => handleCloseModal())
  }

  render() {
    return (
      <div className='form-modal'>
        <h2 className='form-header'>
          Tell us a bit about yourself
        </h2>
        <div className='modal-subheader'>Choose a display name</div>
        <input className='form-modal-input'
          type='text'
          value={this.state.displayName}
          onChange={e => this.setState({ displayName: e.target.value })} />
        <div className='modal-text'>Your display name can be anything you like. Your name or artist name are good choices.</div>
        <button className='form-submit-button' onClick={this.changeDisplayName}>Get started</button>
      </div>
    )
  }
}