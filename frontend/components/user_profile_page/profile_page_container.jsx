import { connect } from 'react-redux';
import { fetchUserSongs, fetchUserByProfileUrl } from '../../actions/users_actions';
import ProfilePage from './profile_page';

import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
  songs: state.entities.songs
})

const mapDispatchToProps = dispatch => ({
  fetchUserSongs: userId => dispatch(fetchUserSongs(userId)),
  fetchUserByProfileUrl: profileUrl => dispatch(fetchUserByProfileUrl(profileUrl))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));