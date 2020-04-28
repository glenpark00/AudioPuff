import { connect } from 'react-redux';
import { enableModalDisplay } from '../../actions/ui_actions';
import NavBarAuth from './nav_bar_auth';

const mapDispatchToProps = (dispatch) => ({
  enableModalDisplay: () => dispatch(enableModalDisplay())
});

export default connect(null, mapDispatchToProps)(NavBarAuth);