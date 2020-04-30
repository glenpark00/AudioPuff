import { RECEIVE_SONG } from '../../actions/songs_actions';

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG:
      return Object.assign({}, state, { [action.song.id]: action.song })
    default:
      return state;
  }
}

export default songsReducer;