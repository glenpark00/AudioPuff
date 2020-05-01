import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_ONE_USER, RECEIVE_MANY_USERS, RECEIVE_USER_SONGS } from '../../actions/users_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_ONE_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_MANY_USERS:
      return Object.assign({}, state, action.users);
    case RECEIVE_USER_SONGS:
      const userSongIdArray = Object.keys(action.songs);
      // You might be clearing your state too much on your reducers, think more about that
      const newState = Object.assign({}, state);
      newState[action.userId]['songs'] = userSongIdArray;
      return newState;
    default:
      return state;
  }
};

export default usersReducer;