import { connect } from 'react-redux';
import { displayGlobalAudioPlayer } from '../../actions/ui_actions';
import { fetchCurrentSongFileUrl, playAudio, pauseAudio } from '../../actions/songs_actions';
import SongDisplayItem from './song_display_item';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentSong: state.currentSong,
  displayPlayer: state.ui.displayPlayer
})

const mapDispatchToProps = dispatch => ({
  displayGlobalAudioPlayer: () => dispatch(displayGlobalAudioPlayer()),
  fetchCurrentSongFileUrl: songId => dispatch(fetchCurrentSongFileUrl(songId)),
  playAudio: () => dispatch(playAudio()),
  pauseAudio: () => dispatch(pauseAudio())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongDisplayItem));