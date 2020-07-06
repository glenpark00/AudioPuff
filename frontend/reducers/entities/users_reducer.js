import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_USER, RECEIVE_MANY_USERS, RECEIVE_USER_SONGS } from '../../actions/users_actions';
import { RECEIVE_SONG, RECEIVE_SONGS, RECEIVE_SEARCH_RESULTS } from '../../actions/songs_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.profileUrl]: action.user });
    case RECEIVE_USER:
      return Object.assign({}, state, { [action.user.profileUrl]: action.user });
    case RECEIVE_MANY_USERS:
      return Object.assign({}, state, action.users);
    case RECEIVE_USER_SONGS:
      return Object.assign({}, state, action.data.users);
    case RECEIVE_SONG:
      return Object.assign({}, state, action.data.likers)
    case RECEIVE_SONGS:
      return Object.assign({}, state, action.data.users);
    case RECEIVE_SEARCH_RESULTS:
      return Object.assign({}, state, action.data.users);
    default:
      return state;
  }
};

export default usersReducer;