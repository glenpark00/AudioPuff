import { RECEIVE_CURRENT_SONG, PLAY_AUDIO, PAUSE_AUDIO, CHANGE_CURRENT_TIME } from '../actions/songs_actions';

const currentSongReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_SONG:
      return { playing: true, id: action.song.id, fileUrl: action.song.fileUrl, imageUrl: action.song.imageUrl, userId: action.song.userId, duration: action.song.duration, currentTime: 0 };
    case CHANGE_CURRENT_TIME:
      newState.currentTime = action.time;
      return newState;
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

export default currentSongReducer;