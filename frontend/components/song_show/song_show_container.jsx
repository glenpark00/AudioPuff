import { connect } from 'react-redux';
import { fetchSongFromUrl, updateSong, deleteSong } from '../../actions/songs_actions';
import { displayGlobalAudioPlayer } from '../../actions/ui_actions';
import { fetchCurrentSongFileUrl, playAudio, pauseAudio } from '../../actions/songs_actions';
import SongShow from './song_show';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
  currentSong: state.currentSong,
  currentUserUrl: state.session.currentUserUrl,
  song: state.entities.songs[`${ownProps.match.params.profileUrl}${ownProps.match.params.songUrl}`],
  user: state.entities.users[ownProps.match.params.profileUrl]
})

const mapDispatchToProps = dispatch => ({
  fetchSongFromUrl: (songUrl, profileUrl) => dispatch(fetchSongFromUrl(songUrl, profileUrl)),
  fetchCurrentSongFileUrl: songId => dispatch(fetchCurrentSongFileUrl(songId)),
  displayGlobalAudioPlayer: () => dispatch(displayGlobalAudioPlayer()),
  playAudio: () => dispatch(playAudio()),
  pauseAudio: () => dispatch(pauseAudio()),
  updateSong: song => dispatch(updateSong(song)),
  deleteSong: songId => dispatch(deleteSong(songId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongShow));