import React, { useEffect, useState } from 'react';
import SongItem from '../song_item/song_item';
import ProfileUserHeader from './profile_user_header';
import SideBarProfileInfo from '../sidebar/sidebar_profile_info';
import SideBarSection from '../sidebar/sidebar_section';
import SideBarSongItem from '../sidebar/sidebar_song_item';
import SideBarUserItem from '../sidebar/sidebar_user_item';
import FollowButton from '../follow_button';
import { fetchAllUserInfo } from '../../actions/users_actions';
import { enableModalDisplay } from '../../actions/ui_actions';
import { FaPencilAlt, FaHeart, FaUserFriends } from 'react-icons/fa';
import { IoIosPerson } from 'react-icons/io';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = ({ match }) => {
  const currentUserUrl = useSelector(state => state.session.currentUser.profileUrl),
    user = useSelector(state => state.entities.users[match.params.profileUrl]),
    users = useSelector(state => state.entities.users),
    songs = useSelector(state => state.entities.songs),
    dispatch = useDispatch(),
    fetchUserInfo = () => dispatch(fetchAllUserInfo(match.params.profileUrl))
   
  useEffect(() => {
    fetchUserInfo()
  }, [match.params.profileUrl])
  
  if (!user) return null;
    
  const userSongs = user.songs ? user.songs.map(songId => songs[songId]).filter(song => song) : []
  const likedSongs = user.likedSongs ? user.likedSongs.map(songId => songs[songId]).filter(song => song) : [];
  const followings = user.followings && users ? user.followings.map(userUrl => users[userUrl]).filter(song => song) : [];
  const followers = user.followers && users ? user.followers.map(userUrl => users[userUrl]).filter(song => song) : [];

  return (
    <div className='current-user-profile-background'>
      <div className='current-user-profile-page'>
        <ProfileUserHeader user={user} />
        <div className='current-user-buttons'>
          { currentUserUrl === user.profileUrl ?
            <div 
              className='user-info-edit-button' 
              onClick={() => dispatch(enableModalDisplay({ type: 'userEdit', data: { user, songs: userSongs.map(song => song.songUrl) } }))}
            >
              <FaPencilAlt /> Edit
            </div>
            : <FollowButton user={user} type='profile' />
          }
        </div>
        <div className='page-full-content'>
          <div className='page-main-content'>
            <div className='profile-subheader-text'>Recent</div>
            <div className='index-recent-songs'>
              {userSongs.map(song => (
                <div className='song-index-key' key={song.id}>
                  <SongItem song={song} user={user} />
                </div>
              ))}
            </div>
          </div>
          <div className='side-bar'>
            <SideBarProfileInfo user={user} />
            <SideBarSection icon={<FaHeart />} items={likedSongs} component={<SideBarSongItem />} text={`${likedSongs.length} likes`} />
            <SideBarSection icon={<FaUserFriends />} items={followings} component={<SideBarUserItem />} text={`${followings.length} following`} />
            { currentUserUrl === user.profileUrl ?
              <SideBarSection icon={<IoIosPerson />} items={followers} component={<SideBarUserItem />} text={`${followers.length} followers`} />
              : null
            }
            <div className='page-border-container'>
              <div className='page-top-border'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ProfilePage);