import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SongItem from './song_item/song_item';
import SideBarMyInfo from './sidebar/sidebar_my_info';
import SideBarSection from './sidebar/sidebar_section';
import SideBarUserItem from './sidebar/sidebar_user_item';
import SideBarSongItem from './sidebar/sidebar_song_item';
import Footer from './footer';
import { fetchUserSongs } from '../actions/users_actions';
import { FaUserFriends, FaHeart } from 'react-icons/fa';
import { timeElapsed } from '../util/general_util';
import { withRouter } from 'react-router-dom';

const Stream = ({ history }) => {
  const songs = useSelector(state => state.entities.songs),
    users = useSelector(state => state.entities.users),
    currentUser = useSelector(state => state.entities.users[state.session.currentUser.profileUrl]),
    dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.followings) {
      currentUser.followings.forEach(userUrl => dispatch(fetchUserSongs(userUrl)));
    }
  }, [currentUser])

  const followedUsersSongs = [];

  if (currentUser.followings) {
    currentUser.followings.forEach(userUrl => {
      const user = users[userUrl];
      if (user) {
        user.songs.map(songKey => followedUsersSongs.push(songs[songKey]))
      }
    })
  }

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
            <div className='stream-header'>This is your stream</div>
            <div className='stream-header-sub'>Follow your favorite artists, labels and friends on SoundCloud and see every track they post right here.</div>
            <div className='stream-subheader'>Hear the latest posts from the people you’re following:</div>
            { followedUsersSongs.length < 1 ? 
              <div>Your stream is currently empty. Go to Search or Home to find music &#38; audio to listen to.</div>
              : 
              <div className='stream-items'>
                { followedUsersSongs.map(song => {
                  const user = users[song.userUrl];
                  return (
                    <div className='stream-item' key={`stream-item-${song.id}`}>
                      <div>
                        <div className='stream-item-info'>
                          <img className='stream-user-img' src={user.imageUrl} alt="following-pic" onClick={() => history.push(`/${user.profileUrl}`)} />
                          <div className='stream-item-user-name' onClick={() => history.push(`/${user.profileUrl}`)}>{user.displayName}</div>
                          <div> posted a track </div>
                          <div>{timeElapsed(song.createdAt)}</div>
                        </div>
                        <SongItem song={song} user={user} hideCreation={true} />
                      </div>
                    </div>
                  )
                })}
                <Footer></Footer>
              </div>
            }
          </div>
          <div className='side-bar'>
            <SideBarMyInfo />
            <SideBarSection icon={<FaUserFriends />} items={whoToFollow} component={<SideBarUserItem />} text='Who to follow' />
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

export default withRouter(Stream);