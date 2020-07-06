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

  handleClick() {
    this.props.history.push(`/${this.props.currentUser.profileUrl}`);
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className='profile-button' onClick={this.handleClick}>
        <img src={currentUser.imageUrl}/> 
        <div>{currentUser.displayName}</div>
      </div>
    )
  }
}

export default withRouter(ProfileDropdownButton);