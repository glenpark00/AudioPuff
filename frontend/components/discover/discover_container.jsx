import { connect } from 'react-redux';
import Discover from './discover';
import { fetchAllSongs } from '../../actions/songs_actions';

const mapStateToProps = state => ({
  songs: Object.values(state.entities.songs),
  users: state.entities.users
})

const mapDispatchToProps = dispatch => ({
  fetchAllSongs: () => dispatch(fetchAllSongs())
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover);