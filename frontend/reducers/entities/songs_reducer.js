import { RECEIVE_SONG } from '../../actions/songs_actions';
import { RECEIVE_USER_SONGS } from '../../actions/users_actions';

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG:
      return Object.assign({}, state, { [action.song.id]: action.song });
    case RECEIVE_USER_SONGS:
      return Object.assign({}, state, action.songs);
    default:
      return state;
  }
}

export default songsReducer;