import { connect } from 'react-redux';
import { displayGlobalAudioPlayer } from '../../actions/ui_actions';
import { fetchCurrentSongFileUrl, playAudio, pauseAudio, changeCurrentTime } from '../../actions/songs_actions';
import SongItem from './song_item';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentSong: state.currentSong,
  displayPlayer: state.ui.displayPlayer
})

const mapDispatchToProps = dispatch => ({
  displayGlobalAudioPlayer: () => dispatch(displayGlobalAudioPlayer()),
  fetchCurrentSongFileUrl: songId => dispatch(fetchCurrentSongFileUrl(songId)),
  playAudio: () => dispatch(playAudio()),
  pauseAudio: () => dispatch(pauseAudio()),
  changeCurrentTime: time => dispatch(changeCurrentTime(time))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongItem));