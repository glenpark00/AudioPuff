import { RECEIVE_SONG, RECEIVE_SONGS, CLEAR_DELETED_SONG, CLEAR_DELETED_SONGS, RECEIVE_SEARCH_RESULTS } from '../../actions/songs_actions';
import { RECEIVE_USER_SONGS, RECEIVE_USER_INFO } from '../../actions/users_actions';

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SONG:
      let songUrl = action.data.song.songUrl.split('').filter(c => c !== '_').join('').toLowerCase()
      let userSongUrl = action.data.song.userUrl + songUrl;
      return Object.assign({}, state, { [userSongUrl]: action.data.song });
    case RECEIVE_SONGS:
      return Object.assign({}, state, action.data.songs);
    case CLEAR_DELETED_SONG:
      delete newState[action.song.userUrl + action.song.songUrl.split('').filter(c => c !== '_').join('').toLowerCase()];
      return newState;
    case CLEAR_DELETED_SONGS:
      if (action.data.songs) {
        action.data.songs.forEach(song => {
          delete newState[action.data.userUrl + song.split('').filter(c => c !== '_').join('').toLowerCase()];
        })
      }
      return newState;
    case RECEIVE_USER_SONGS:
      const userSongs = (action.data.songs ? action.data.songs : {})
      return Object.assign({}, state, userSongs);
    case RECEIVE_USER_INFO:
      const userAllSongs = (action.data.songs ? action.data.songs : {})
      return Object.assign({}, state, userAllSongs);
    case RECEIVE_SEARCH_RESULTS:
      return Object.assign({}, state, action.data.songs);
    default:
      return state;
  }
}

export default songsReducer;