import { connect } from 'react-redux';
import { fetchUserSongs } from '../../actions/users_actions';
import CurrentUserSongsIndex from './current_user_songs_index';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserId],
  songs: state.entities.songs
})

const mapDispatchToProps = dispatch => ({
  fetchUserSongs: userId => dispatch(fetchUserSongs(userId)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentUserSongsIndex));