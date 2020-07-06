import { combineReducers } from "redux";
import modalReducer from './modal_reducer';
import displayGlobalPlayerReducer from "./display_global_player_reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  displayPlayer: displayGlobalPlayerReducer
});

export default uiReducer;
