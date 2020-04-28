import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ONE_USER, RECEIVE_MANY_USERS } from '../actions/users_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_ONE_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_MANY_USERS:
      return Object.assign({}, state, action.users);
    default:
      return state;
  }
};

export default usersReducer;