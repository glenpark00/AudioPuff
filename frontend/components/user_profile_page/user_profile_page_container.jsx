import { connect } from 'react-redux';
import { fetchUserSongs, updateUser } from '../../actions/users_actions';
import UserProfilePage from './user_profile_page';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserUrl],
  user: state.entities.users[ownProps.match.params.profileUrl],
  users: state.entities.users,
  songs: state.entities.songs
})

const mapDispatchToProps = dispatch => ({
  fetchUserSongs: profileUrl => dispatch(fetchUserSongs(profileUrl)),
  updateUser: user => dispatch(updateUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfilePage));