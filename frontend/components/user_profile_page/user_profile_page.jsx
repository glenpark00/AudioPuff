import React from 'react';
import CurrentUserProfilePageContainer from './current_user_profile_page_container';
import ProfilePageContainer from './profile_page_container'

const UserProfilePage = ({ match, currentUser }) => {
  if (currentUser && match.params.profileUrl === currentUser.profileUrl) {
    return <CurrentUserProfilePageContainer />
  } else {
    return <ProfilePageContainer userProfileUrl={match.params.profileUrl} />
  }
}

export default UserProfilePage;