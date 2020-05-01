import { connect } from 'react-redux';
import { fetchUserSongs } from '../actions/users_actions';
import CurrentUserSongsIndex from './current_user_songs_index';
import { displayGlobalAudioPlayer } from '../actions/ui_actions';
import { fetchCurrentSongFileUrl } from '../actions/songs_actions';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserId],
  songs: state.entities.songs
})

const mapDispatchToProps = dispatch => ({
  fetchUserSongs: userId => dispatch(fetchUserSongs(userId)),
  displayGlobalAudioPlayer: () => dispatch(displayGlobalAudioPlayer()),
  fetchCurrentSongFileUrl: songId => dispatch(fetchCurrentSongFileUrl(songId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserSongsIndex);