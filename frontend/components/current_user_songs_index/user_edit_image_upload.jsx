import React from 'react';

export default class UserEditImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      imageUrl: null
    }
    this.handleImageInput = this.handleImageInput.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
  }

  handleUploadClick() {
    document.querySelector('.hidden-upload').click();
  }

  handleImageInput(e) {
    const file = e.target.files[0];
    this.props.setImageFile(file);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ imageFile: file, imageUrl: fileReader.result })
    }
    fileReader.readAsDataURL(file);
  }

  render() {
    return (
      <div className='profile-image-container'>
        {this.state.imageUrl ?
          <img className='profile-image-preview' src={this.state.imageUrl} />
          : <img className='profile-image-original' src={this.props.imageUrl}/>
        }
        <input className='hidden-upload' type="file" onChange={this.handleImageInput} />
        <div className='profile-image-upload-button' onClick={this.handleUploadClick} >📷 Upload Image</div>
        {this.props.imageError ? <div>You must provide an image</div> : ''}
      </div>
    )
  }
}