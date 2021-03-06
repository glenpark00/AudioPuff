import React from 'react';

export default class SongUploadImage extends React.Component {
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
      <div className='song-upload-image-container'>
        {this.state.imageUrl ?
          <img className='song-upload-image-preview' src={this.state.imageUrl} />
          : <img className='song-original-image' src={this.props.originalImageUrl} />
        }
        <input className='hidden-upload' type="file" onChange={this.handleImageInput} />
        <div className='song-image-upload-button-edit' onClick={this.handleUploadClick} >📷 Upload Image</div>
      </div>
    )
  }
}