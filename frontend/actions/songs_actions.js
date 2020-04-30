import * as SongsApiUtil from '../util/songs_api_util';

// Action Type Constants
export const RECEIVE_SONG = 'RECEIVE_SONG';
export const RECEIVE_SONG_ERRORS = 'RECEIVE_SONG_ERRORS';

// Regular Action Creators
const receiveSong = song => ({
  type: RECEIVE_SONG,
  song
})

const receiveSongErrors = errors => ({
  type: RECEIVE_SONG_ERRORS,
  errors
})

// Thunk Action Creators
export const createSong = (song, currentUserId) => dispatch => (
  SongsApiUtil.createSong(song, currentUserId).then(
    song => dispatch(receiveSong(song)),
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
)