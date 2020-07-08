import { connect } from 'react-redux';
import NavBar from './nav_bar';

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser
})

export default connect(mapStateToProps, null)(NavBar);