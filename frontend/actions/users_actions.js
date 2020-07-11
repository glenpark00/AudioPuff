import * as UsersApiUtil from '../util/users_api_util';
import { clearDeletedSongs } from './songs_actions';
import { receiveCurrentUser } from './session_actions'

// Action Type Constants
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_MANY_USERS = 'RECEIVE_MANY_USERS';
export const RECEIVE_USER_SONGS = 'RECEIVE_USER_SONGS';
export const CLEAR_USER = 'CLEAR_USER';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

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

const clearUser = profileUrl => ({
  type: CLEAR_USER,
  profileUrl
})

const receiveUserInfo = data => ({
  type: RECEIVE_USER_INFO,
  data
})

// Thunk Action Creators
export const fetchUser = userId => dispatch => (
  UsersApiUtil.fetchUser(userId).then(
    user => {
      dispatch(receiveUser(user));
      return user;      
    }
  )
);

export const fetchUsers = () => dispatch => (
  UsersApiUtil.fetchUsers().then(
    users => dispatch(receiveManyUsers(users))
  )
);

export const updateUser = (user, userUrl, songs) => dispatch => (
  UsersApiUtil.updateUser(user).then(
    data => {
      dispatch(receiveCurrentUser(Object.values(data.user)[0]));
      dispatch(receiveUserSongs(data));
      if (Object.values(data.user)[0].profileUrl !== userUrl) {
        dispatch(clearUser(userUrl));
        dispatch(clearDeletedSongs({ userUrl, songs }));
      }
    }
  )
)

export const fetchUserSongs = profileUrl => dispatch => (
  UsersApiUtil.fetchUserSongs(profileUrl).then(
    data => dispatch(receiveUserSongs(data))
  )
)

export const fetchAllUserInfo = profileUrl => dispatch => (
  UsersApiUtil.fetchAllUserInfo(profileUrl).then(
    data => dispatch(receiveUserInfo(data))
  )
)