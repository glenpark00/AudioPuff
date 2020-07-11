import { connect } from 'react-redux';
import { playAudio, pauseAudio, changeCurrentTime, fetchCurrentSongFileUrl } from '../../actions/songs_actions';
import GlobalAudioPlayer from './global_audio_player';

const mapStateToProps = state => {
  let song = null;
  let audio = state.audio;
  if (state.audio.currentSong.id) {
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
  fetchCurrentSongFileUrl: (songId, songs) => dispatch(fetchCurrentSongFileUrl(songId, songs))
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalAudioPlayer);