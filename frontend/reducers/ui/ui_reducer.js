import { combineReducers } from "redux";
import showModalReducer from './show_modal_reducer';

const uiReducer = combineReducers({
  showModal: showModalReducer
});

export default uiReducer;
