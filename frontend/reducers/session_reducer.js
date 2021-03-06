import { 
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER 
} from '../actions/session_actions';

const _nullSession = {
  currentUser: null
};

const sessionReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser: { id: action.user.id, profileUrl: action.user.profileUrl } };
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
};

export default sessionReducer;