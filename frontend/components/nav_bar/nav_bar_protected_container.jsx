import { connect } from 'react-redux';
import NavBarProtected from './nav_bar_protected';

const mapStateToProps = ({
  currentUser: state.entities.users[state.session.currentUserId]
})