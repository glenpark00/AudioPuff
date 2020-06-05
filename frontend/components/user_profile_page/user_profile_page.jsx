import React from 'react';
import CurrentUserProfilePage from './current_user_profile_page';
import ProfilePage from './profile_page'

const UserProfilePage = ({ currentUser, user, songs, fetchUserSongs, updateUser }) => {
  if (currentUser && user === currentUser) {
    return (
      <CurrentUserProfilePage 
        currentUser={currentUser}
        songs={songs}
        fetchUserSongs={fetchUserSongs}
        updateUser={updateUser}
      />
    )
  } else {
    return (
      <ProfilePage
        user={user} 
        songs={songs}
        fetchUserSongs={fetchUserSongs}
        updateUser={updateUser}
      />
    )
  }
}

export default UserProfilePage;