import { connect } from 'react-redux';
import { playAudio, pauseAudio, changeCurrentTime, fetchCurrentSongFileUrl } from '../../actions/songs_actions';
import GlobalAudio from './global_audio';

const mapStateToProps = state => ({
  audio: state.audio.currentSong ? state.audio : { currentSong: {}, songIds: state.audio.songIds, playing: false },
  displayPlayer: state.ui.displayPlayer,
  users: state.entities.users
})

const mapDispatchToProps = dispatch => ({
  changeCurrentTime: time => dispatch(changeCurrentTime(time)), 
  playAudio: () => dispatch(playAudio()),
  pauseAudio: () => dispatch(pauseAudio()),
  fetchCurrentSongFileUrl: songId => dispatch(fetchCurrentSongFileUrl(songId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalAudio);