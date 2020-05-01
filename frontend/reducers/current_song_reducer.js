import { RECEIVE_CURRENT_SONG } from '../actions/songs_actions';

const currentSongReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_SONG:
      return { songId: action.song.id, fileUrl: action.song.fileUrl }
    default:
      return state;
  }
}

export default currentSongReducer;