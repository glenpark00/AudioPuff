import * as UsersApiUtil from '../util/users_api_util';

// Action Type Constants
export const RECEIVE_ONE_USER = 'RECEIVE_ONE_USER';
export const RECEIVE_MANY_USERS = 'RECEIVE_MANY_USERS';

// Regular Action Creators
const receiveOneUser = user => ({
  type: RECEIVE_ONE_USER,
  user
});

const receiveManyUsers = users => ({
  type: RECEIVE_MANY_USERS,
  users
});

// Thunk Action Creators
export const fetchUser = userId => dispatch => (
  UsersApiUtil.fetchUser(userId).then(
    user => dispatch(receiveOneUser(user)))
);

export const fetchUsers = () => dispatch => (
  UsersApiUtil.fetchUsers().then(
    users => dispatch(receiveManyUsers(users))
  )
);