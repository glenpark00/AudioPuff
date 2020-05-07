import { RECEIVE_SONG, RECEIVE_ALL_SONGS, CLEAR_DELETED_SONG } from '../../actions/songs_actions';
import { RECEIVE_USER_SONGS } from '../../actions/users_actions';

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG:
      return Object.assign({}, state, { [action.song.id]: action.song });
    case RECEIVE_ALL_SONGS:
      return Object.assign({}, state, action.songs);
    case CLEAR_DELETED_SONG:
      const newState = Object.assign({}, state);
      delete newState[action.songId];
      return newState;
    case RECEIVE_USER_SONGS:
      return Object.assign({}, state, action.songs);
    default:
      return state;
  }
}

export default songsReducer;