import { connect } from 'react-redux';
import UserProfilePage from './user_profile_page';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentUserProfileUrl: state.entities.users[state.session.currentUserId].profileUrl
})

export default withRouter(connect(mapStateToProps)(UserProfilePage));