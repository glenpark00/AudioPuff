import { RECEIVE_CURRENT_SONG, PLAY_AUDIO, PAUSE_AUDIO, CHANGE_CURRENT_TIME, RECEIVE_SONGS } from '../actions/songs_actions';
import { RECEIVE_USER_SONGS } from '../actions/users_actions';

const audioReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_SONG:
      const currentSong = { ...action.song, currentTime: 0 };
      if (state.songIds) {
        let nextSongIdx = state.songIds.indexOf(action.song.id) + 1;
        if (nextSongIdx >= state.songIds.length) {
          nextSongIdx = 0;
        }
        let prevSongIdx = state.songIds.indexOf(action.song.id) - 1;
        if (prevSongIdx < 0) {
          prevSongIdx = 0;
        }
        const nextSong = state.songIds[nextSongIdx];
        const prevSong = state.songIds[prevSongIdx];
        return Object.assign(newState, { currentSong, nextSong, prevSong, playing: true });
      } else {
        return Object.assign(newState, { currentSong, nextSong: action.song.id, songIds: [action.song.id], playing: true })
      }
    case CHANGE_CURRENT_TIME:
      newState.currentSong.currentTime = action.time;
      return newState;
    case PLAY_AUDIO:
      newState.playing = true;
      return newState;
    case PAUSE_AUDIO:
      newState.playing = false;
      return newState;
    case RECEIVE_SONGS:
      const songIds = action.data.songs ? Object.values(action.data.songs).map(song => song.id) : {};
      return Object.assign(newState, { songIds });
    case RECEIVE_USER_SONGS:
      const userSongIds = action.data.songs ? Object.values(action.data.songs).map(song => song.id) : {};
      return Object.assign(newState, { songIds: userSongIds });
    default:
      return state;
  }
}

export default audioReducer;