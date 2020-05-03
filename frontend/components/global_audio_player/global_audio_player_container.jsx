import { connect } from 'react-redux';
import GlobalAudioPlayer from './global_audio_player';

const mapStateToProps = state => ({
  currentSong: state.currentSong,
  songs: state.entities.songs,
  displayPlayer: state.ui.displayPlayer
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalAudioPlayer);