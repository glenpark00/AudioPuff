import React from 'react';
import UserEditImageUpload from './user_edit_image_upload';
import UserEditProfileUrl from './user_edit_profile_url';
import { withRouter } from 'react-router-dom';

class UserEditFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      imageUrl: this.props.user.imageUrl,
      displayName: this.props.user.displayName,
      profileUrl: this.props.user.profileUrl,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      city: this.props.user.city,
      country: this.props.user.country,
      bio: this.props.user.bio,
      nameError: false,
      urlError: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.setImageFile = this.setImageFile.bind(this);
  }

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value })
  }

  setImageFile(imageFile) {
    this.setState({ imageFile })
  }

  checkFields() {
    if (this.state.displayName === '') {
      this.setState({ nameError: true })
    } else {
      this.setState({ nameError: false })
    }
    if (this.state.profileUrl === '') {
      this.setState({ urlError: true })
    } else {
      this.setState({ urlError: false })
    }
  }

  handleUpdateUser() {
    this.checkFields();
    if (this.state.displayName != '' && this.state.profileUrl != '') {
      const formData = this.prepareForm();
      this.props.updateUser(formData);
      this.props.handleCloseModal();
      this.props.history.push(`/${this.state.profileUrl}`)
    }
  }

  prepareForm() {
    const formData = new FormData();
    const { imageFile, displayName, profileUrl, firstName, lastName, city, country, bio } = this.state;
    formData.append('user[id]', this.props.user.id)
    formData.append('user[profileImage]', imageFile);
    formData.append('user[displayName]', displayName)
    formData.append('user[profileUrl]', profileUrl);
    formData.append('user[firstName]', firstName);
    formData.append('user[lastName]', lastName);
    formData.append('user[city]', city);
    formData.append('user[country]', country);
    formData.append('user[bio]', bio);
    return formData;
  }

  handleCancel() {
    this.setState({
      imageFile: null, imageUrl: this.props.user.imageUrl, displayName: this.props.user.displayName, profileUrl: this.props.user.profileUrl,firstName: this.props.user.firstName, lastName: this.props.user.lastName, city: this.props.user.city, country: this.props.user.country, bio: this.props.user.bio, nameError: false, urlError: false
    })
    this.props.handleCloseModal();
  }

  render() {
    const { imageUrl, displayName, profileUrl, firstName, lastName, city, country, bio } = this.state;
    return (
      <div className='user-edit-background'>
        <div className='user-edit-form-content'>
          <h2>Edit your Profile</h2>
          <div className='user-edit-form'>
            <UserEditImageUpload setImageFile={this.setImageFile} imageUrl={ imageUrl } />
            <div className='user-edit-info-form'>
              <div className='user-edit-text'>Display name</div>
              <input className='user-edit-input' type="text" value={displayName} onChange={this.handleInput('displayName')} />
              {this.state.nameError ? <div>You must provide a display name.</div> : ''}
              <div className='user-edit-text'>Profile URL</div>
              <div className='profile-url-field'>
                <span className='profile-url-static'>audiopuff.herokuapp.com/</span>
                <UserEditProfileUrl profileUrl={profileUrl} handleInput={this.handleInput('profileUrl')} />
              </div>
              <div className='user-edit-real-name'>
                <div className='user-edit-first-name'>
                  <div className='user-edit-text'>First name</div>
                  <input className='user-edit-small-input' type="text" value={firstName} onChange={this.handleInput('firstName')} />
                </div>
                <div className='user-edit-last-name'>
                  <div className='user-edit-text'>Last name</div>
                  <input className='user-edit-small-input' type="text" value={lastName} onChange={this.handleInput('lastName')} />
                </div>
              </div>
              <div className='user-edit-location'>
                <div className='user-edit-city'>
                  <div className='user-edit-text'>City</div>
                  <input className='user-edit-input' type="text" value={city} onChange={this.handleInput('city')} />
                </div>
                <div className='user-edit-country'>
                  <div className='user-edit-text'>Country</div>
                  <input className='user-edit-input' type="text" value={country} onChange={this.handleInput('country')} />
                </div>
              </div>
              <div className='user-edit-text'>Bio</div>
              <textarea className='user-edit-textarea'
                value={bio}
                onChange={this.handleInput('bio')}
                cols="30" rows="10"
                placeholder='Tell the world a little about yourself. The shorter the better'></textarea>
            </div>
          </div>
          <div className='user-edit-buttons'>
            <button className='cancel-user-edit-button' onClick={this.handleCancel}>Cancel</button>
            <button className='save-user-edit-button' onClick={this.handleUpdateUser}>Save changes</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserEditFormModal);