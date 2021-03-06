import React from 'react';
import Carousel from './carousel';
import Playlist from './playlist';
import SideBarMyInfo from '../sidebar/sidebar_my_info';
import SideBarSection from '../sidebar/sidebar_section';
import SideBarUserItem from '../sidebar/sidebar_user_item';
import { FaUserFriends, FaHeart } from 'react-icons/fa';
import SideBarSongItem from '../sidebar/sidebar_song_item';

export default class Discover extends React.Component {
  componentDidMount() {
    this.smallScreen = window.innerWidth < 900;
    window.scrollTo(0, 0);
    const { fetchSongs, fetchUsers } = this.props;
    fetchUsers();
    fetchSongs();
  }

  render() {
    const { users, songs, currentUser } = this.props;

    const whoToFollow = currentUser ? Object.values(users).filter(user => (
      user.id !== currentUser.id && currentUser.followings && !currentUser.followings.includes(user.profileUrl)
    )) : [];

    const allUsers = currentUser ? Object.values(users).filter(user => user.id !== currentUser.id) : Object.values(users);

    const likedSongs = currentUser && currentUser.likedSongs ? currentUser.likedSongs.map(songKey => songs[songKey]).filter(song => song) : [];

    const songsArr = Object.values(songs);

    const trending = songsArr.sort((a, b) => (a.likers.length > b.likers.length) ? -1 : 1).slice(0, 15);

    const theUpload = songsArr.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1).slice(0, 15);

    const hipHop = songsArr.filter(song => song.genre === 'Hip hop & Rap');

    const electronic = songsArr.filter(song => song.genre === 'Electronic');

    const rAndB = songsArr.filter(song => song.genre === 'R&B & Soul');

    const pop = songsArr.filter(song => song.genre === 'Pop');

    const rock = songsArr.filter(song => song.genre === 'Rock');

    return (
      <div className='discover-page-background'>
        <div className='discover-page'>
          <div className='page-full-content'>
            <div className='page-main-content'>
              <div className='discover-heading-container'>
                <h2 className='discover-header'>AudioPuff: Trending</h2>
                <div className='discover-subheader'>Up-and-coming tracks on AudioPuff</div>
              </div>
              <Carousel songs={trending} users={users} type='songs' />
              <div className='discover-heading-container'>
                <h2 className='discover-header'>The Upload</h2>
                <div className='discover-subheader'>Newly posted tracks. Just for you</div>
              </div>
              <Playlist songs={theUpload} users={users} />
              <div className='discover-heading-container'>
                <h2 className='discover-header'>Up Next</h2>
                <div className='discover-subheader'>Emerging creators and artists to follow</div>
              </div>
              <Carousel users={allUsers} type='users' />
              <div className='discover-heading-container'>
                <h2 className='discover-header'>Hip Hop &#38; Rap</h2>
                <div className='discover-subheader'>The latest and hottest hip-hop &#38; rap</div>
              </div>
              <Carousel songs={hipHop} users={users} type='songs' />
              <div className='discover-heading-container'>
                <h2 className='discover-header'>Electronic</h2>
                <div className='discover-subheader'>The latest and hottest electronic music</div>
              </div>
              <Carousel songs={electronic} users={users} type='songs' />
              <div className='discover-heading-container'>
                <h2 className='discover-header'>R&#38;B &#38; Soul</h2>
                <div className='discover-subheader'>The latest and hottest R&#38;B &#38; Soul</div>
              </div>
              <Carousel songs={rAndB} users={users} type='songs' />
              <div className='discover-heading-container'>
                <h2 className='discover-header'>Pop</h2>
                <div className='discover-subheader'>The latest and hottest pop music</div>
              </div>
              <Carousel songs={pop} users={users} type='songs' />
              <div className='discover-heading-container'>
                <h2 className='discover-header'>Rock</h2>
                <div className='discover-subheader'>The latest and hottest rock</div>
              </div>
              <Carousel songs={rock} users={users} type='songs' />
            </div>
            { !this.smallScreen ? (
              <div className='side-bar'>
                <SideBarMyInfo />
                <SideBarSection icon={<FaUserFriends />} items={whoToFollow} component={<SideBarUserItem />} text='Who to follow' />
                <SideBarSection icon={<FaHeart />} items={likedSongs} component={<SideBarSongItem />} text={`${likedSongs.length} likes`} url='/you/likes' />
                <div className='page-border-container'>
                  <div className='page-top-border'></div>
                </div>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      </div>
    )
  }
}