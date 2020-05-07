import { connect } from 'react-redux';
import { fetchSongFromUrl, updateSong, deleteSong } from '../../actions/songs_actions';
import { fetchUserDisplay } from '../../actions/users_actions';
import { displayGlobalAudioPlayer } from '../../actions/ui_actions';
import { fetchCurrentSongFileUrl, playAudio, pauseAudio } from '../../actions/songs_actions';
import SongShow from './song_show';

const mapStateToProps = (state, ownProps) => ({
  currentSong: state.currentSong,
  currentUserId: state.session.currentUserId,
  songUrl: ownProps.match.params.songUrl,
  profileUrl: ownProps.match.params.profileUrl
})

const mapDispatchToProps = dispatch => ({
  fetchSongFromUrl: (songUrl, profileUrl) => dispatch(fetchSongFromUrl(songUrl, profileUrl)),
  fetchCurrentSongFileUrl: songId => dispatch(fetchCurrentSongFileUrl(songId)),
  fetchUserDisplay: userId => dispatch(fetchUserDisplay(userId)),
  displayGlobalAudioPlayer: () => dispatch(displayGlobalAudioPlayer()),
  playAudio: () => dispatch(playAudio()),
  pauseAudio: () => dispatch(pauseAudio()),
  updateSong: song => dispatch(updateSong(song)),
  deleteSong: songId => dispatch(deleteSong(songId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SongShow);