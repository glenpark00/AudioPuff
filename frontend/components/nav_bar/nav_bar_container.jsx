import { connect } from 'react-redux';
import NavBar from './nav_bar';

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUserId
})

export default connect(mapStateToProps, null)(NavBar);