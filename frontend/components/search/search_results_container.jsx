import { connect } from 'react-redux';
import SearchResults from './search_results';
import { search } from '../../actions/songs_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  const searchSongs = state.searchResults.songs.filter(song => state.entities.songs[song]).map(song => state.entities.songs[song]);
  const songUsers = {};
  searchSongs.forEach(song => songUsers[song.userUrl] = state.entities.users[song.userUrl]);

  return ({
    songs: searchSongs,
    users: state.searchResults.users.filter(user => state.entities.users[user]).map(user => state.entities.users[user]),
    songUsers
  })
}

const mapDispatchToProps = dispatch => ({
  search: fragment => dispatch(search(fragment))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));