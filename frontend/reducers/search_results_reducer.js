import { RECEIVE_SEARCH_RESULTS } from '../actions/songs_actions';

const defaultState = { songs: [], users: [] }

const searchResultsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      const songs = action.data.songs ? Object.values(action.data.songs).map(song => song.userUrl + song.songUrl.split('').filter(c => c !== '_').join('').toLowerCase()) : [];
      const users = action.data.users ? Object.values(action.data.users).map(user => user.profileUrl) : [];
      return { songs, users };
    default:
      return state;
  }
}

export default searchResultsReducer;