import { combineReducers } from "redux";
import entitiesReducer from "./entities/entities_reducer";
import errorsReducer from "./errors/errors_reducer.js";
import uiReducer from "./ui/ui_reducer";
import sessionReducer from './session_reducer';
import audioReducer from './audio_reducer';

const rootReducer = combineReducers({
	entities: entitiesReducer,
	errors: errorsReducer,
	ui: uiReducer,
	session: sessionReducer,
	audio: audioReducer
});

export default rootReducer;
