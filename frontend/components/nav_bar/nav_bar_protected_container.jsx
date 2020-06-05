import { connect } from 'react-redux';
import { fetchUser } from '../../actions/users_actions';
import NavBarProtected from './nav_bar_protected';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserUrl]
})

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarProtected);