import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { search } from '../../actions/songs_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  songs: state.searchResults.songs.filter(song => state.entities.songs[song]).map(song => state.entities.songs[song]),
  users: state.searchResults.users.filter(user => state.entities.users[user]).map(user => state.entities.users[user])
})

const mapDispatchToProps = dispatch => ({
  search: fragment => dispatch(search(fragment))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
