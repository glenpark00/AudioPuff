import * as UsersApiUtil from '../util/users_api_util';

// Action Type Constants
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_DISPLAY = 'RECEIVE_USER_DISPLAY';
export const RECEIVE_MANY_USERS = 'RECEIVE_MANY_USERS';
export const RECEIVE_USER_SONGS = 'RECEIVE_USER_SONGS';

// Regular Action Creators
const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveUserDisplay = user => ({
  type: RECEIVE_USER_DISPLAY,
  user
})

const receiveManyUsers = users => ({
  type: RECEIVE_MANY_USERS,
  users
});

const receiveUserSongs = (userId, songs) => ({
  type: RECEIVE_USER_SONGS,
  userId,
  songs
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
    user => dispatch(receiveUser(user))
  )
)

export const fetchUserSongs = userId => dispatch => (
  UsersApiUtil.fetchUserSongs(userId).then(
    songs => dispatch(receiveUserSongs(userId, songs))
  )
)

export const fetchUserDisplay = userId => dispatch => (
  UsersApiUtil.fetchUserDisplay(userId).then(
    user => {
      dispatch(receiveUserDisplay(user));
      return user;
    }
  )
)