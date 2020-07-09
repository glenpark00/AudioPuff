import React, { useState } from 'react';
import UserEditImageUpload from './user_edit_image_upload';
import UserEditProfileUrl from './user_edit_profile_url';
import { updateUser } from '../../actions/users_actions';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const UserEditFormModal = ({ user, songs, handleCloseModal, history }) => {
  const [imageFile, setImageFile] = useState(null),
    [imageUrl, setImageUrl] = useState(user.imageUrl),
    [displayName, setDisplayName] = useState(user.displayName),
    [profileUrl, setProfileUrl] = useState(user.profileUrl),
    [firstName, setFirstName] = useState(user.firstName),
    [lastName, setLastName] = useState(user.lastName),
    [city, setCity] = useState(user.city),
    [country, setCountry] = useState(user.country),
    [bio, setBio] = useState(user.bio),
    [nameError, setNameError] = useState(false),
    [urlError, setUrlError] = useState(false),
    originalProfileUrl = user.profileUrl,
    dispatch = useDispatch();

  const checkFields = () => {
    if (displayName === '') {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (profileUrl === '') {
      setUrlError(true);
    } else {
      setUrlError(false);
    }
  }

  const handleUpdateUser = () => {
    checkFields();
    if (displayName != '' && profileUrl != '') {
      const formData = prepareForm();
      dispatch(updateUser(formData, originalProfileUrl, songs))
        .then(() => history.push(`/${profileUrl}`))
        .then(() => handleCloseModal())
    }
  }

  const prepareForm = () => {
    const formData = new FormData();
    formData.append('user[id]', user.id)
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

  const handleCancel = () => {
    handleCloseModal();
  }

  return (
    <div className='user-edit-background'>
      <div className='user-edit-form-content'>
        <h2>Edit your Profile</h2>
        <div className='user-edit-form'>
          <UserEditImageUpload setImageFile={setImageFile} imageUrl={imageUrl} />
          <div className='user-edit-info-form'>
            <div className='user-edit-text'>Display name</div>
            <input className='user-edit-input' type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
            {nameError ? <div>You must provide a display name.</div> : ''}
            <div className='user-edit-text'>Profile URL</div>
            <div className='profile-url-field'>
              <span className='profile-url-static'>audiopuff.herokuapp.com/</span>
              <UserEditProfileUrl profileUrl={profileUrl} handleInput={val => setProfileUrl(val)} />
            </div>
            <div className='user-edit-real-name'>
              <div className='user-edit-first-name'>
                <div className='user-edit-text'>First name</div>
                <input className='user-edit-small-input' type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className='user-edit-last-name'>
                <div className='user-edit-text'>Last name</div>
                <input className='user-edit-small-input' type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
            </div>
            <div className='user-edit-location'>
              <div className='user-edit-city'>
                <div className='user-edit-text'>City</div>
                <input className='user-edit-input' type="text" value={city} onChange={e => setCity(e.target.value)} />
              </div>
              <div className='user-edit-country'>
                <div className='user-edit-text'>Country</div>
                <input className='user-edit-input' type="text" value={country} onChange={e => setCountry(e.target.value)} />
              </div>
            </div>
            <div className='user-edit-text'>Bio</div>
            <textarea className='user-edit-textarea'
              value={bio}
              onChange={e => setBio(e.target.value)}
              cols="30" rows="10"
              placeholder='Tell the world a little about yourself. The shorter the better'></textarea>
          </div>
        </div>
        <div className='user-edit-buttons'>
          <button className='cancel-user-edit-button' onClick={handleCancel}>Cancel</button>
          <button className='save-user-edit-button' onClick={handleUpdateUser}>Save changes</button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(UserEditFormModal);