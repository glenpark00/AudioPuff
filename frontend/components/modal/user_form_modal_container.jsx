import { connect } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import UserFormModal from './user_form_modal';

const mapStateToProps = state => ({
  errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  signup: user => dispatch(signup(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserFormModal);