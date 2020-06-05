import { connect } from 'react-redux';
import Discover from './discover';
import { fetchNSongs } from '../../actions/songs_actions';

const mapStateToProps = state => ({
  songs: state.entities.songs,
  users: state.entities.users
})

const mapDispatchToProps = dispatch => ({
  fetchNSongs: n => dispatch(fetchNSongs(n)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover);