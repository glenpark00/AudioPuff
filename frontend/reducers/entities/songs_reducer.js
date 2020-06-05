import { RECEIVE_SONG, RECEIVE_SONGS, CLEAR_DELETED_SONG } from '../../actions/songs_actions';
import { RECEIVE_USER_SONGS } from '../../actions/users_actions';

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG:
      const userSongUrl = action.data.song.userUrl + action.data.song.songUrl.toLowerCase();
      return Object.assign({}, state, { [userSongUrl]: action.data.song });
    case RECEIVE_SONGS:
      return Object.assign({}, state, action.data.songs);
    case CLEAR_DELETED_SONG:
      const newState = Object.assign({}, state);
      delete newState[action.songUrl];
      return newState;
    case RECEIVE_USER_SONGS:
      return action.data.songs;
    default:
      return state;
  }
}

export default songsReducer;