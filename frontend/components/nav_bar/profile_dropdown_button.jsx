import React from 'react';
import { withRouter } from 'react-router-dom';

class ProfileDropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }
  
  // This and the withRouter should be removed later; this is for testing song uploads by making a user songs index
  handleClick() {
    this.props.history.push(`/${this.props.currentUser.profileUrl}`);
  }

  render() {
    return (
      <img className='profile-button' src={this.props.currentUser.imageUrl} onClick={ this.handleClick } /> 
    )
  }
}

export default withRouter(ProfileDropdownButton);