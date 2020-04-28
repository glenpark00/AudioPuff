import { connect } from 'react-redux';
import { login, signup, clearSessionErrors } from '../../actions/session_actions';
import { disableModalDisplay } from '../../actions/ui_actions';
import UserFormModal from './user_form_modal';

const mapStateToProps = state => ({
  showModal: state.ui.showModal,
  errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  signup: user => dispatch(signup(user)),
  clearSessionErrors: () => dispatch(clearSessionErrors()),
  disableModalDisplay: () => dispatch(disableModalDisplay())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserFormModal);