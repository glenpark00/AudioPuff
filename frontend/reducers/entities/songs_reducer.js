import { RECEIVE_SONG, RECEIVE_SONGS, CLEAR_DELETED_SONG, RECEIVE_SEARCH_RESULTS } from '../../actions/songs_actions';
import { RECEIVE_USER_SONGS } from '../../actions/users_actions';

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG:
      const songUrl = action.data.song.songUrl.split('').filter(c => c !== '_').join('').toLowerCase()
      const userSongUrl = action.data.song.userUrl + songUrl;
      let likes = [];
      if (action.data.likers) likes = Object.values(action.data.likers).map(liker => liker.profileUrl);
      return Object.assign({}, state, { [userSongUrl]: { ...action.data.song, likes } });
    case RECEIVE_SONGS:
      return Object.assign({}, state, action.data.songs);
    case CLEAR_DELETED_SONG:
      const newState = Object.assign({}, state);
      delete newState[action.songUrl];
      return newState;
    case RECEIVE_USER_SONGS:
      const userSongs = (action.data.songs ? action.data.songs : {})
      return Object.assign({}, state, userSongs);
    case RECEIVE_SEARCH_RESULTS:
      return Object.assign({}, state, action.data.songs);
    default:
      return state;
  }
}

export default songsReducer;