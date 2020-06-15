import { connect } from 'react-redux';
import { playAudio, pauseAudio, changeCurrentTime, fetchCurrentSongFileUrl } from '../../actions/songs_actions';
import GlobalAudioPlayer from './global_audio_player';

const mapStateToProps = state => ({
  audio: state.audio,
  displayPlayer: state.ui.displayPlayer,
  users: state.entities.users
})

const mapDispatchToProps = dispatch => ({
  changeCurrentTime: time => dispatch(changeCurrentTime(time)), 
  playAudio: () => dispatch(playAudio()),
  pauseAudio: () => dispatch(pauseAudio()),
  fetchCurrentSongFileUrl: songId => dispatch(fetchCurrentSongFileUrl(songId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalAudioPlayer);