import React from 'react';
import Footer from '../footer';
import Carousel from './carousel';
import SideBarMyInfo from '../sidebar/sidebar_my_info';
import SideBarSection from '../sidebar/sidebar_section';
import SideBarUserItem from '../sidebar/sidebar_user_item';
import { FaUserFriends, FaHeart } from 'react-icons/fa';
import SideBarSongItem from '../sidebar/sidebar_song_item';

export default class Discover extends React.Component {
  componentDidMount() {
    const { fetchNSongs, fetchUserSongs, currentUser } = this.props;
    fetchNSongs(10);
    if (currentUser) {
      fetchUserSongs(currentUser.profileUrl);
    }
  }

  render() {
    const { users, songs, currentUser } = this.props;
    const whoToFollow = currentUser ? Object.values(users).filter(user => (
      user.id !== currentUser.id && currentUser.followings && !currentUser.followings.includes(user.profileUrl)
    )) : [];
    for (let i = whoToFollow.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = whoToFollow[i];
      whoToFollow[i] = whoToFollow[j];
      whoToFollow[j] = temp;
    }
    const likedSongs = currentUser && currentUser.likedSongs ? currentUser.likedSongs.map(songKey => songs[songKey]).filter(song => song) : [];

    return (
      <div className='discover-page-background'>
        <div className='discover-page'>
          <div className='page-full-content'>
            <div className='page-main-content'>
              <div className='discover-heading-container'>
                <h2 className='discover-header'>New Music Now</h2>
                <div className='discover-subheader'>The latest hits, updated all the time</div>
              </div>
              <Carousel songs={Object.values(songs)} users={users}/>
              <Footer></Footer>
            </div>
            <div className='side-bar'>
              <SideBarMyInfo />
              <SideBarSection icon={<FaUserFriends />} items={whoToFollow} component={<SideBarUserItem/>} text='Who to follow' />
              <SideBarSection icon={<FaHeart />} items={likedSongs} component={<SideBarSongItem />} text={`${likedSongs.length} likes`} />
              <div className='page-border-container'>
                <div className='page-top-border'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}