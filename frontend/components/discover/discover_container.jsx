import { connect } from 'react-redux';
import Discover from './discover';
import { fetchSongs } from '../../actions/songs_actions';
import { fetchUsers } from '../../actions/users_actions';

const mapStateToProps = state => ({
  songs: state.entities.songs,
  users: state.entities.users,
  currentUser: state.session.currentUser ? state.entities.users[state.session.currentUser.profileUrl] : {}
})

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => dispatch(fetchSongs()),
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover);