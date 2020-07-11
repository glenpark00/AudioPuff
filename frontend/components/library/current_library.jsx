import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignedOutFormPage from '../signed_out_form_page';
import LibraryLikes from './library_songs';
import LibraryFollow from './library_follow';
import { fetchAllUserInfo } from '../../actions/users_actions';
import { withRouter, Route, Switch } from 'react-router-dom';

const CurrentLibrary = ({ history }) => {
  const users = useSelector(state => state.entities.users),
    songs = useSelector(state => state.entities.songs),
    currentUser = useSelector(state => state.session.currentUser ? state.entities.users[state.session.currentUser.profileUrl] : {}),
    dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.id) {
      dispatch(fetchAllUserInfo(currentUser.profileUrl));
    }
  }, [])

  if (!currentUser.id) {
    return <SignedOutFormPage text='Join AudioPuff to save your favorite music' />;
  }

  const userSongs = currentUser.songs ? currentUser.songs.map(songKey => songs[songKey]).filter(song => song ) : [];

  const likedSongs = currentUser.likedSongs ? currentUser.likedSongs.map(songKey => songs[songKey]).filter(song => song ) : [];
    
  const followings = currentUser.followings ? currentUser.followings.map(userUrl => users[userUrl]).filter(user => user) : [];

  const followers = currentUser.followers ? currentUser.followers.map(userUrl => users[userUrl]).filter(user => user) : [];

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
            className={`library-header${history.location.pathname === '/you/tracks' ? ' library-selected' : ''}`}
            onClick={() => history.push('/you/tracks')}
          >
            Tracks
          </div>
          <div 
            className={`library-header${history.location.pathname === '/you/likes' ? ' library-selected' : ''}`}
            onClick={() => history.push('/you/likes')}
          >
            Likes
          </div>
          <div 
            className={`library-header${history.location.pathname === '/you/following' ? ' library-selected' : ''}`}
            onClick={() => history.push('/you/following')}
          >
            Following
          </div>
          <div 
            className={`library-header${history.location.pathname === '/you/followers' ? ' library-selected' : ''}`}
            onClick={() => history.push('/you/followers')}
          >
            Followers
          </div>
        </div>
        <Switch>
          <Route exact path='/you/library' render={() => (
            <div>
              <LibraryLikes songs={userSongs} users={{ [currentUser.profileUrl]: currentUser }} overview={true} text='Tracks' />
              <LibraryLikes songs={likedSongs} users={users} overview={true} text='Likes' />
              <LibraryFollow users={followings} overview={true} text='Following' />
              <LibraryFollow users={followers} overview={true} text='Followers' />
            </div>
          )} />
          <Route exact path='/you/tracks' component={() => <LibraryLikes songs={userSongs} users={{ [currentUser.profileUrl]: currentUser }} />} />
          <Route exact path='/you/likes' component={() => <LibraryLikes songs={likedSongs} users={users} />} />
          <Route exact path='/you/following' component={() => <LibraryFollow users={followings} />} />
          <Route exact path='/you/followers' component={() => <LibraryFollow users={followers} />} />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(CurrentLibrary);