import * as SongsApiUtil from '../util/songs_api_util';

// Action Type Constants
export const RECEIVE_SONG = 'RECEIVE_SONG';
export const RECEIVE_SONG_ERRORS = 'RECEIVE_SONG_ERRORS';
export const CLEAR_DELETED_SONG = 'CLEAR_DELETED_SONG';
export const CLEAR_DELETED_SONGS = 'CLEAR_DELETED_SONGS';
export const RECEIVE_CURRENT_SONG = 'RECEIVE_CURRENT_SONG';
export const RECEIVE_SONGS = 'RECEIVE_SONGS';
export const CHANGE_CURRENT_TIME = 'CHANGE_CURRENT_TIME';
export const PLAY_AUDIO = 'PLAY_AUDIO';
export const PAUSE_AUDIO = 'PAUSE_AUDIO';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

// Regular Action Creators
const receiveSong = data => ({
  type: RECEIVE_SONG,
  data
})

export const receiveSongErrors = errors => ({
  type: RECEIVE_SONG_ERRORS,
  errors
})

const clearDeletedSong = song => ({
  type: CLEAR_DELETED_SONG,
  song
})

export const clearDeletedSongs = data => ({
  type: CLEAR_DELETED_SONGS,
  data
})

const receiveSongs = data => ({
  type: RECEIVE_SONGS,
  data
})

const receiveCurrentSong = data => ({
  type: RECEIVE_CURRENT_SONG,
  data
})

export const receiveSearchResults = data => ({
  type: RECEIVE_SEARCH_RESULTS,
  data
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
    errors => {
      dispatch(receiveSongErrors(errors.responseJSON))
    }
  )
)

export const updateSong = (song, songUrl) => dispatch => (
  SongsApiUtil.updateSong(song).then(
    data => {
      dispatch(receiveSong(data))
      if (data.song.songUrl !== songUrl) {
        dispatch(clearDeletedSong({ userUrl: data.song.userUrl, songUrl }))
      }
    },
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
)

export const deleteSong = songId => dispatch => (
  SongsApiUtil.deleteSong(songId).then(
    data => dispatch(clearDeletedSong(data.song))
  )
)

export const fetchSongFromUrl = (songUrl, profileUrl) => dispatch => (
  SongsApiUtil.fetchSongFromUrl(songUrl, profileUrl).then(
    data => dispatch(receiveSong(data))
  )
)

export const fetchCurrentSongFileUrl = (songId, songIds) => dispatch => (
  SongsApiUtil.fetchSongFileUrl(songId).then(
    song => dispatch(receiveCurrentSong({ song, songIds }))
  )
)
 
export const fetchNSongs = n => dispatch => (
  SongsApiUtil.fetchNSongs(n).then(
    data => dispatch(receiveSongs(data))
  )
)

export const fetchSongs = () => dispatch => (
  SongsApiUtil.fetchSongs().then(
    data => dispatch(receiveSongs(data))
  )
)

export const search = fragment => dispatch => {
  if (fragment === '') {
    return dispatch(receiveSearchResults({ songs: {}, users: {} }))
  } else {
    return SongsApiUtil.search(fragment)
      .then(data => {
        dispatch(receiveSearchResults(data));
        return data;
      })
  }

}