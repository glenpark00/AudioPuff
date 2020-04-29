import { connect } from 'react-redux';
import NavBarProtected from './nav_bar_protected';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserId]
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarProtected);