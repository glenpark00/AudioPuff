import React from 'react';
import { withRouter } from 'react-router-dom';

const SearchUserItem = ({ user, history }) => {
  const openUserShow = () => {
    history.push(`${user.profileUrl}`)
  }

  return (
    <div className='user-display-item'>
      <img className='user-display-image' src={user.imageUrl} alt="user-image" onClick={openUserShow}/>
      <div className='user-display-info'>
        <div onClick={openUserShow}>{user.displayName}</div>
        <div>{user.city} / {user.country}</div>
      </div>
    </div>
  )
}

export default withRouter(SearchUserItem);