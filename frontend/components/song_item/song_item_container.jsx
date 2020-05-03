import { connect } from 'react-redux';
import { displayGlobalAudioPlayer } from '../../actions/ui_actions';
import { fetchCurrentSongFileUrl } from '../../actions/songs_actions';
import SongItem from './song_item';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentSong: state.currentSong.fileUrl
})

const mapDispatchToProps = dispatch => ({
  displayGlobalAudioPlayer: () => dispatch(displayGlobalAudioPlayer()),
  fetchCurrentSongFileUrl: songId => dispatch(fetchCurrentSongFileUrl(songId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongItem));