import * as SessionApiUtil from '../util/session_api_util';

// Action Type Constants
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

// Regular Action Creators
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
})

// Thunk Action Creators
export const signup = user => dispatch => (
  SessionApiUtil.signup(user).then(
    user => (dispatch(receiveCurrentUser(user))),
    errors => (dispatch(receiveSessionErrors(errors.responseJSON)))
  )
);

export const login = user => dispatch => (
  SessionApiUtil.login(user).then(
    user => (dispatch(receiveCurrentUser(user))),
    errors => (dispatch(receiveSessionErrors(errors.responseJSON)))
  )
);

export const logout = () => dispatch => (
  SessionApiUtil.logout().then(
    () => (dispatch(logoutCurrentUser())),
    errors => (dispatch(receiveSessionErrors(errors.responseJSON)))
  )
);
