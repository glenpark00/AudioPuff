import { DISPLAY_GLOBAL_AUDIO_PLAYER } from '../../actions/ui_actions';

const displayGlobalPlayerReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case DISPLAY_GLOBAL_AUDIO_PLAYER:
      return true
    default:
      return state;
  }
}

export default displayGlobalPlayerReducer;