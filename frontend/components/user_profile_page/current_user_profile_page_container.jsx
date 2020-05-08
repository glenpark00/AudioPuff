import { connect } from 'react-redux';
import { fetchUserSongs } from '../../actions/users_actions';
import { updateUser } from '../../actions/users_actions';
import CurrentUserProfilePage from './current_user_profile_page';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserId],
  songs: state.entities.songs
})

const mapDispatchToProps = dispatch => ({
  fetchUserSongs: userId => dispatch(fetchUserSongs(userId)),
  updateUser: user => dispatch(updateUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentUserProfilePage));