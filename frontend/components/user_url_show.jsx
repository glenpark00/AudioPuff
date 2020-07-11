import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ProfilePage from './profile_page/profile_page';
import UserLibrary from './library/user_library';
import SongShowContainer from './song_show/song_show_container';

const UserUrlShow = ({ match }) => {
  const profileUrl = match.params.profileUrl;

  return (
    <Switch>
      <Route exact path={`/${profileUrl}`} render={() => <ProfilePage profileUrl={profileUrl} />} />
      <Route exact path={`/${profileUrl}/tracks`} render={() => <UserLibrary profileUrl={profileUrl} />} />
      <Route exact path={`/${profileUrl}/likes`} render={() => <UserLibrary profileUrl={profileUrl} />} />
      <Route exact path={`/${profileUrl}/following`} render={() => <UserLibrary profileUrl={profileUrl} />} />
      <Route exact path={`/${profileUrl}/followers`} render={() => <UserLibrary profileUrl={profileUrl} />} />
      <Route path={`/${profileUrl}/:songUrl`} render={() => <SongShowContainer profileUrl={profileUrl}/>} />
    </Switch>
  )
}

export default withRouter(UserUrlShow);