import React from 'react';
import CurrentUserProfilePageContainer from './current_user_profile_page_container';
import ProfilePageContainer from './profile_page_container'

const UserProfilePage = ({ match, currentUserProfileUrl }) => {
  if (match.params.profileUrl === currentUserProfileUrl) {
    return <CurrentUserProfilePageContainer />
  } else {
    return <ProfilePageContainer userProfileUrl={match.params.profileUrl} />
  }
}

export default UserProfilePage;