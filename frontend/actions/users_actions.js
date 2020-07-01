import * as UsersApiUtil from '../util/users_api_util';
import { receiveCurrentUser } from './session_actions'

// Action Type Constants
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_MANY_USERS = 'RECEIVE_MANY_USERS';
export const RECEIVE_USER_SONGS = 'RECEIVE_USER_SONGS';

// Regular Action Creators
const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const receiveManyUsers = users => ({
  type: RECEIVE_MANY_USERS,
  users
});

const receiveUserSongs = data => ({
  type: RECEIVE_USER_SONGS,
  data
})

// Thunk Action Creators
export const fetchUser = userId => dispatch => (
  UsersApiUtil.fetchUser(userId).then(
    user => dispatch(receiveUser(user)))
);

export const fetchUsers = () => dispatch => (
  UsersApiUtil.fetchUsers().then(
    users => dispatch(receiveManyUsers(users))
  )
);

export const updateUser = user => dispatch => (
  UsersApiUtil.updateUser(user).then(
    user => {
      dispatch(receiveCurrentUser(user))
      dispatch(receiveUser(user));
    }
  )
)

export const fetchUserSongs = profileUrl => dispatch => (
  UsersApiUtil.fetchUserSongs(profileUrl).then(
    data => dispatch(receiveUserSongs(data))
  )
)