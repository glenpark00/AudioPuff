import { combineReducers } from "redux";
import showModalReducer from './show_modal_reducer';
import displayGlobalPlayerReducer from "./display_global_player_reducer";

const uiReducer = combineReducers({
  showModal: showModalReducer,
  displayPlayer: displayGlobalPlayerReducer
});

export default uiReducer;
