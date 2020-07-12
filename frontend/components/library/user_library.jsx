import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LibrarySongs from './library_songs';
import LibraryFollow from './library_follow';
import { fetchAllUserInfo } from '../../actions/users_actions';
import { withRouter, Route, Switch } from 'react-router-dom';

const UserLibrary = ({ profileUrl, history }) => {
  const users = useSelector(state => state.entities.users),
    user = useSelector(state => state.entities.users[profileUrl]),
    songs = useSelector(state => state.entities.songs),
    dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllUserInfo(profileUrl))
  }, [])

  if (!user) return null;

  const userSongs = user.songs ? user.songs.map(songKey => songs[songKey]).filter(song => song) : [];

  const likedSongs = user.likedSongs ? user.likedSongs.map(songKey => songs[songKey]).filter(song => song) : [];

  const followings = user.followings ? user.followings.map(userUrl => users[userUrl]).filter(user => user) : [];

  const followers = user.followers ? user.followers.map(userUrl => users[userUrl]).filter(user => user) : [];

  return (
    <div className='library-page-background'>
      <div className='library-page'>
        <div className='library-profile-header'>
          <div>
            <div className='library-profile-header-info'>
              <img className='library-profile-header-img' src={user.imageUrl} alt="library-profile"/>
              <div onClick={() => history.push(`/${user.profileUrl}`)}>{user.displayName}</div>
            </div>
            <div className='library-headings'>
              <div
                className={`library-header${history.location.pathname === `/${user.profileUrl}/tracks` ? ' library-selected' : ''}`}
                onClick={() => history.push(`/${user.profileUrl}/tracks`)}
              >
                Tracks
              </div>
              <div
                className={`library-header${history.location.pathname === `/${user.profileUrl}/likes` ? ' library-selected' : ''}`}
                onClick={() => history.push(`/${user.profileUrl}/likes`)}
              >
                Likes
              </div>
              <div
                className={`library-header${history.location.pathname === `/${user.profileUrl}/following` ? ' library-selected' : ''}`}
                onClick={() => history.push(`/${user.profileUrl}/following`)}
              >
                Following
              </div>
              <div
                className={`library-header${history.location.pathname === `/${user.profileUrl}/followers` ? ' library-selected' : ''}`}
                onClick={() => history.push(`/${user.profileUrl}/followers`)}
              >
                Followers
              </div>
            </div>
          </div>
        </div>
        <div className='phantom-library-profile-header'></div>
        <Switch>
          <Route exact path={`/${user.profileUrl}/tracks`} render={() => 
            <LibrarySongs songs={userSongs} users={users} profile={true} />
          } />
          <Route exact path={`/${user.profileUrl}/likes`} render={() => 
            <LibrarySongs songs={likedSongs} users={users} profile={true} />
          } />
          <Route exact path={`/${user.profileUrl}/following`} component={() => <LibraryFollow users={followings} profile={true} />}  />
          <Route exact path={`/${user.profileUrl}/followers`} component={() => <LibraryFollow users={followers} profile={true} />} />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(UserLibrary);