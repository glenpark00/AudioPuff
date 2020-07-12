import { RECEIVE_CURRENT_SONG, PLAY_AUDIO, PAUSE_AUDIO, CHANGE_CURRENT_TIME } from '../actions/songs_actions';

const defaultState = { currentSong: {}, songIds: [], playing: false };

const audioReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_SONG:
      const song = action.data.song;
      const songIds = action.data.songIds;
      const currentSong = { ...song, currentTime: 0 };
      let nextSongIdx;
      let prevSongIdx;
      let nextSong;
      let prevSong;
      if (!songIds) {
        nextSongIdx = state.songIds.indexOf(song.id) + 1;
        if (nextSongIdx >= state.songIds.length) {
          nextSongIdx = 0;
        }
        prevSongIdx = state.songIds.indexOf(song.id) - 1;
        if (prevSongIdx < 0) {
          prevSongIdx = state.songIds.length - 1;
        }
        nextSong = state.songIds[nextSongIdx];
        prevSong = state.songIds[prevSongIdx];
        return Object.assign(newState, { currentSong, nextSong, prevSong, playing: true });
      } else if (state.songIds.length === 0 && songIds.length <= 1) {
        return Object.assign(newState, { currentSong, nextSong: song.id, prevSong: song.id, songIds: [song.id], playing: true })
      } else {
        nextSongIdx = songIds.indexOf(song.id) + 1;
        if (nextSongIdx >= songIds.length) {
          nextSongIdx = 0;
        }
        prevSongIdx = state.songIds.indexOf(song.id) - 1;
        if (prevSongIdx < 0) {
          prevSongIdx = songIds.length - 1;
        }
        nextSong = songIds[nextSongIdx];
        prevSong = songIds[prevSongIdx];
        return Object.assign(newState, { currentSong, nextSong, prevSong, songIds, playing: true })
       }
    case CHANGE_CURRENT_TIME:
      if (action.time !== state.currentSong.currentTime) {
        newState.currentSong.currentTime = action.time;
        return newState;
      } else {
        return state;
      }
    case PLAY_AUDIO:
      newState.playing = true;
      return newState;
    case PAUSE_AUDIO:
      newState.playing = false;
      return newState;
    default:
      return state;
  }
}

export default audioReducer;