import { RECEIVE_SONG_ERRORS, RECEIVE_SONG } from '../../actions/songs_actions';

const songErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG_ERRORS:
      if (action.errors) {
        return action.errors;
      } else {
        return ['Something went wrong'];
      }
    case RECEIVE_SONG:
      return [];
    default:
      return state;
  }
}

export default songErrorsReducer;