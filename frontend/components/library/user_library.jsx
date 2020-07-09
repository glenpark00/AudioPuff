import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LibraryLikes from './library_likes';
import LibraryFollowing from './library_following';
import { fetchAllUserInfo } from '../../actions/users_actions';
import { withRouter, Route, Switch } from 'react-router-dom';

const UserLibrary = ({ history }) => {
  const users = useSelector(state => state.entities.users),
    songs = useSelector(state => state.entities.songs),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUserInfo(currentUser.profileUrl))
  }, [])

  if (!currentUser) return null;

  const likedSongs = currentUser.likedSongs ? currentUser.likedSongs.map(songKey => songs[songKey]).filter(song => song) : [];

  const followings = currentUser.followings ? currentUser.followings.map(userUrl => users[userUrl]).filter(user => user) : [];

  return (
    <div className='library-page-background'>
      <div className='library-page'>
        <div className='library-headings'>
          <div
            className={`library-header${history.location.pathname === '/you/library' ? ' library-selected' : ''}`}
            onClick={() => history.push('/you/library')}
          >
            Overview
          </div>
          <div
            className={`library-header${history.location.pathname === '/you/likes' ? ' library-selected' : ''}`}
            onClick={() => history.push('/you/likes')}
          >
            Likes
          </div>
          <div
            className={`library-header${history.pathname === '/you/following' ? ' library-selected' : ''}`}
            onClick={() => history.push('/you/following')}
          >
            Following
          </div>
        </div>
        <Switch>
          <Route exact path='/you/library' render={() => (
            <div>
              <LibraryLikes songs={likedSongs} users={users} overview={true} />
              <LibraryFollowing users={followings} overview={true} />
            </div>
          )} />
          <Route exact path='/you/likes' component={() => <LibraryLikes songs={likedSongs} users={users} />} />
          <Route exact path='/you/following' component={() => <LibraryFollowing users={followings} />} />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(UserLibrary);