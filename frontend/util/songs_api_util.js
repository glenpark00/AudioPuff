export const createSong = (song) => (
  $.ajax({
    url: `api/songs`,
    method: 'POST',
    data: song,
    contentType: false,
    processData: false
  })
)

export const updateSong = song => (
  $.ajax({
    url: `api/songs/${song.id}`,
    method: 'PATCH',
    data: song,
    contentType: false,
    processData: false
  })
)

export const deleteSong = songId => (
  $.ajax({
    url: `api/songs/${songId}`,
    method: 'DELETE'
  })
)

export const fetchSongFromUrl = (songUrl, profileUrl) => (
  $.ajax({
    url: `api/${profileUrl}/${songUrl}`,
    method: 'GET'
  })
)

export const fetchSongFileUrl = songId => (
  $.ajax({
    url: `api/songs/${songId}/file`,
    method: 'GET'
  })
)

export const fetchAllSongs = () => (
  $.ajax({
    url: `api/songs`,
    method: 'GET'
  })
)