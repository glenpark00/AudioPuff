import { connect } from 'react-redux';
import SiteDropdown from './site_dropdown';
import { logout } from '../../actions/session_actions';

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(SiteDropdown);