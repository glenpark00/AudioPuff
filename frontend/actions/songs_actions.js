import * as SongsApiUtil from '../util/songs_api_util';
import { receiveUserDisplay } from '../actions/users_actions';
import { fetchUserDisplay } from '../util/users_api_util';

// Action Type Constants
export const RECEIVE_SONG = 'RECEIVE_SONG';
export const RECEIVE_SONG_ERRORS = 'RECEIVE_SONG_ERRORS';
export const RECEIVE_CURRENT_SONG = 'RECEIVE_CURRENT_SONG';

// Regular Action Creators
const receiveSong = song => ({
  type: RECEIVE_SONG,
  song
})

const receiveSongErrors = errors => ({
  type: RECEIVE_SONG_ERRORS,
  errors
})

const receiveCurrentSong = song => ({
  type: RECEIVE_CURRENT_SONG,
  song
})

// Thunk Action Creators
export const createSong = song => dispatch => (
  SongsApiUtil.createSong(song).then(
    song => dispatch(receiveSong(song)),
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
)

export const fetchSong = songId => dispatch => (
  SongsApiUtil.fetchSong(songId).then(
    song => {
      dispatch(receiveSong(song));
      fetchUserDisplay(song.user_id).then(
        user => receiveUserDisplay(user)
      )
    }
  )
)

export const fetchCurrentSongFileUrl = songId => dispatch => (
  SongsApiUtil.fetchSongFileUrl(songId).then(
    song => dispatch(receiveCurrentSong(song))
  )
)
