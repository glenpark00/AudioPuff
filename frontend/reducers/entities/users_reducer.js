import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_USER, RECEIVE_MANY_USERS, RECEIVE_USER_SONGS, CLEAR_USER, RECEIVE_USER_INFO } from '../../actions/users_actions';
import { RECEIVE_SONG, RECEIVE_SONGS, RECEIVE_SEARCH_RESULTS } from '../../actions/songs_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state); 
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState[action.user.profileUrl] = action.user;
      return newState;
    case RECEIVE_USER:
      newState[action.user.profileUrl] = action.user;
      return newState;
    case RECEIVE_MANY_USERS:
      return Object.assign(newState, action.users);
    case CLEAR_USER:
      delete newState[action.profileUrl];
      return newState;
    case RECEIVE_USER_SONGS:
      return Object.assign(newState, action.data.user);
    case RECEIVE_USER_INFO:
      return Object.assign(newState, action.data.users);
    case RECEIVE_SONG:
      return Object.assign(newState, action.data.likers, { [action.data.user.profileUrl]: action.data.user })
    case RECEIVE_SONGS:
      return Object.assign(newState, action.data.users);
    case RECEIVE_SEARCH_RESULTS:
      const songUsers = action.data.songUsers || {}
      return Object.assign(newState, action.data.users, songUsers);
    default:
      return state;
  }
};

export default usersReducer;