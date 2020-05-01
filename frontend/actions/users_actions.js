import * as UsersApiUtil from '../util/users_api_util';

// Action Type Constants
export const RECEIVE_ONE_USER = 'RECEIVE_ONE_USER';
export const RECEIVE_MANY_USERS = 'RECEIVE_MANY_USERS';
export const RECEIVE_USER_SONGS = 'RECEIVE_USER_SONGS';

// Regular Action Creators
const receiveOneUser = user => ({
  type: RECEIVE_ONE_USER,
  user
});

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
    user => dispatch(receiveOneUser(user)))
);

export const fetchUsers = () => dispatch => (
  UsersApiUtil.fetchUsers().then(
    users => dispatch(receiveManyUsers(users))
  )
);

export const fetchUserSongs = userId => dispatch => (
  UsersApiUtil.fetchUserSongs(userId).then(
    songs => dispatch(receiveUserSongs(userId, songs))
  )
)