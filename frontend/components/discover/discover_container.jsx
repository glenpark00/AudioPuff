import { connect } from 'react-redux';
import Discover from './discover';
import { fetchNSongs } from '../../actions/songs_actions';
import { fetchUserSongs } from '../../actions/users_actions';

const mapStateToProps = state => ({
  songs: state.entities.songs,
  users: state.entities.users,
  currentUser: state.entities.users[state.session.currentUserUrl]
})

const mapDispatchToProps = dispatch => ({
  fetchNSongs: n => dispatch(fetchNSongs(n)),
  fetchUserSongs: userUrl => dispatch(fetchUserSongs(userUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover);