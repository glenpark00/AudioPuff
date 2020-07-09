import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ProfilePage from './profile_page/profile_page';

const UserUrlShow = ({ match }) => {
  const profileUrl = match.params.profileUrl;

  <Switch>
    <Route exact path={`${profileUrl}`} component={ProfilePage} />
    <Route exact path={`${profileUrl}/likes`} />
  </Switch>
}

export default withRouter(UserUrlShow);