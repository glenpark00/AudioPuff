import React from 'react';
import SongItemWaveform from '../song_item/song_item_waveform';
import { timeElapsed } from '../../util/general_util'; 
import PlayButton from '../play_button';
import LikeButton from '../like_button';
import { FaTrash, FaPencilAlt, FaUserFriends, FaHeart } from 'react-icons/fa';
import { GiSoundWaves } from 'react-icons/gi';
import FollowButton from '../follow_button';

export default class SongShow extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.linkToProfile = this.linkToProfile.bind(this);
  }

  componentDidMount() {
    const { fetchSongFromUrl, match, profileUrl } = this.props;
    fetchSongFromUrl(match.params.songUrl, profileUrl);
  }

  linkToProfile() {
    this.props.history.push(`/${this.props.user.profileUrl}`);
  }

  openModal(type) {
    const { enableModalDisplay, song, user } = this.props;
    enableModalDisplay({ type, data: { song, user } });
  }

  render() {
    const { song, user, likers } = this.props;
    if (!song || !user) return null; 
    return (
      <div className='song-show-page-background'>
        <div className='song-show-page'>
          <div className='song-show-header'>
            <div className='song-show-info-container'>
              <PlayButton song={song} type='show' />
              <div className='song-show-info'>
                <div className='song-show-upper'> 
                  <div className='song-show-info-top-line'>
                    <div className='song-show-display-name' onClick={this.linkToProfile}>{user.displayName}</div>
                    <div className='song-show-time-elapsed'>{timeElapsed(song.createdAt)}</div>
                  </div>
                  <div className='song-show-title-container'>
                    <div className='song-show-title'>{song.title}</div>
                    {song.genre !== 'None' ? <div className='song-show-genre'>#{song.genre}</div> : null}
                  </div>
                </div>
                <SongItemWaveform song={song} />
              </div>
              <img src={song.imageUrl} className='song-show-image' />
            </div>
          </div>
          <div className='user-song-item-buttons'>
            <div className='like-button-border'>
              <LikeButton
                song={song}
                text={song.likers.length > 0 ? song.likers.length : 'Like'} />
            </div>
            {this.props.currentUserUrl === user.profileUrl ?
              <>
                <div className='user-song-item-button' onClick={() => this.openModal('songEdit')}>{<FaPencilAlt />} Edit</div>
                <div className='user-song-item-button' onClick={() => this.openModal('songDelete')}>{<FaTrash />} Delete track</div>
              </>
              : null
            }
          </div>
          <div className='page-full-content'>
            <div className='page-main-content'>

            </div>
            <div className='side-bar'>
              <div className='side-bar-song-user'>
                <img className='side-bar-song-user-img' src={user.imageUrl} alt="song-show-user" onClick={this.linkToProfile}/>
                <div className='side-bar-song-user-name'>
                  <div onClick={this.linkToProfile}>{user.displayName}</div>
                  <div className='side-bar-song-user-stats'>
                    <div>
                      <FaUserFriends color='#999' />
                      <div>{user.follower ? user.followers.length : ''}</div>
                    </div>
                    <div>
                      <GiSoundWaves color='#999' fontSize='25px' />
                      <div>{user.songs ? user.songs.length : ''}</div>
                    </div>
                  </div>
                  <FollowButton user={user} />
                </div>
              </div>
              <div className='side-bar-section'>
                <div className='side-bar-section-top'>
                  <div>
                    {<FaHeart />}
                    <div>{likers.length} likes</div>
                  </div>
                </div>
                <div className='side-bar-song-show-likers'>
                  {likers.filter(liker => liker).slice(0, 10).map((liker, i) => (
                    <img 
                      className='side-bar-song-show-liker-img' 
                      src={liker.imageUrl} alt="song-show-liker" 
                      key={`side-bar-song-show-liker-${liker.id}`}
                      style={{ left: `${i * (30 - i)}px` }}/>
                  ))}
                </div>
              </div>
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