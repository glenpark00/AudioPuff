import { connect } from 'react-redux';
import UserProfilePage from './user_profile_page';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserId]
})

export default withRouter(connect(mapStateToProps)(UserProfilePage));