import { connect } from 'react-redux';
import { playAudio, pauseAudio, changeCurrentTime } from '../../actions/songs_actions';
import GlobalAudioPlayer from './global_audio_player';

const mapStateToProps = state => ({
  currentSong: state.currentSong,
  songs: state.entities.songs,
  displayPlayer: state.ui.displayPlayer
})

const mapDispatchToProps = dispatch => ({
  changeCurrentTime: time => dispatch(changeCurrentTime(time)), 
  playAudio: () => dispatch(playAudio()),
  pauseAudio: () => dispatch(pauseAudio())
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalAudioPlayer);