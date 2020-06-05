import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_USER, RECEIVE_MANY_USERS, RECEIVE_USER_SONGS } from '../../actions/users_actions';
import { RECEIVE_SONGS } from '../../actions/songs_actions';

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
      const user = Object.values(action.data.users)[0]
      const userSongIdArray = Object.keys(action.data.songs);
      // You might be clearing your state too much on your reducers, think more about that
      const newState = Object.assign({}, state, { [user.profileUrl]: user });
      newState[user.profileUrl]['songs'] = userSongIdArray;
      return newState;
    case RECEIVE_SONGS:
      return Object.assign({}, state, action.data.users)
    default:
      return state;
  }
};

export default usersReducer;