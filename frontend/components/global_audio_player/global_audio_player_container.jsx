import { connect } from 'react-redux';
import { playAudio, pauseAudio, changeCurrentTime, fetchCurrentSongFileUrl } from '../../actions/songs_actions';
import GlobalAudio from './global_audio';

const mapStateToProps = state => {
  let song = null;
  let audio = { currentSong: {}, songIds: state.audio.songIds, playing: false };
  if (state.audio.currentSong) {
    const songKey = state.audio.currentSong.userUrl + state.audio.currentSong.songUrl.split('').filter(c => c !== '_').join('');
    song = state.entities.songs[songKey];
    audio = state.audio
  }
  return ({
    audio,
    song,
    displayPlayer: state.ui.displayPlayer,
    users: state.entities.users 
  })
}

const mapDispatchToProps = dispatch => ({
  changeCurrentTime: time => dispatch(changeCurrentTime(time)), 
  playAudio: () => dispatch(playAudio()),
  pauseAudio: () => dispatch(pauseAudio()),
  fetchCurrentSongFileUrl: songId => dispatch(fetchCurrentSongFileUrl(songId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalAudio);