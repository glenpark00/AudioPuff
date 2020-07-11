import React from 'react';
import LibraryUserItem from './library_user_item';
import { Link, withRouter } from 'react-router-dom';

const LibraryFollow = ({ users, overview, text, profile }) => {

  return (
    <div className='library-follow'>
      <div className={overview ? 'library-overview-subheader' : 'library-subheader'}>{profile ? '' : (overview ? text : "Hear what the people you follow have posted")}</div>
      <div className='library-content'>
        { users.length > 0 ?
          users.map(user => 
            <LibraryUserItem user={user} />
          ) :
           <div className='library-empty-content'>
            <div>There's nothing here. <Link to='/discover'>Browse music</Link></div>
          </div>
        }
      </div>
    </div>
  )
}

export default withRouter(LibraryFollow);