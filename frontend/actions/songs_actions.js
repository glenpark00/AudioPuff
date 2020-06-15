import * as SongsApiUtil from '../util/songs_api_util';

// Action Type Constants
export const RECEIVE_SONG = 'RECEIVE_SONG';
export const RECEIVE_SONG_ERRORS = 'RECEIVE_SONG_ERRORS';
export const CLEAR_DELETED_SONG = 'CLEAR_DELETED_SONG';
export const RECEIVE_CURRENT_SONG = 'RECEIVE_CURRENT_SONG';
export const RECEIVE_SONGS = 'RECEIVE_SONGS';
export const CHANGE_CURRENT_TIME = 'CHANGE_CURRENT_TIME';
export const PLAY_AUDIO = 'PLAY_AUDIO';
export const PAUSE_AUDIO = 'PAUSE_AUDIO';

// Regular Action Creators
const receiveSong = data => ({
  type: RECEIVE_SONG,
  data
})

const receiveSongErrors = errors => ({
  type: RECEIVE_SONG_ERRORS,
  errors
})

const clearDeletedSong = songId => ({
  type: CLEAR_DELETED_SONG,
  songId
})


const receiveSongs = data => ({
  type: RECEIVE_SONGS,
  data
})

const receiveCurrentSong = song => ({
  type: RECEIVE_CURRENT_SONG,
  song
})

export const changeCurrentTime = time => ({
  type: CHANGE_CURRENT_TIME,
  time
})

export const playAudio = () => ({
  type: PLAY_AUDIO
})

export const pauseAudio = () => ({
  type: PAUSE_AUDIO
})

// Thunk Action Creators
export const createSong = song => dispatch => (
  SongsApiUtil.createSong(song).then(
    song => dispatch(receiveSong(song)),
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
)

export const updateSong = song => dispatch => (
  SongsApiUtil.updateSong(song).then(
    song => dispatch(receiveSong(song)),
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
)

export const deleteSong = songId => dispatch => (
  SongsApiUtil.deleteSong(songId).then(
    () => dispatch(clearDeletedSong(songId))
  )
)

export const fetchSongFromUrl = (songUrl, profileUrl) => dispatch => (
  SongsApiUtil.fetchSongFromUrl(songUrl, profileUrl).then(
    data => dispatch(receiveSong(data))
  )
)

export const fetchCurrentSongFileUrl = songId => dispatch => (
  SongsApiUtil.fetchSongFileUrl(songId).then(
    song => dispatch(receiveCurrentSong(song))
  )
)
 
export const fetchNSongs = n => dispatch => (
  SongsApiUtil.fetchNSongs(n).then(
    data => dispatch(receiveSongs(data))
  )
)