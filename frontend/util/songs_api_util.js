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
    url: `api/songs/${song.get('song[id]')}`,
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

export const fetchSong = songId => (
  $.ajax({
    url: `api/songs/${songId}`,
    method: 'GET'
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

export const fetchNSongs = n => (
  $.ajax({
    url: `api/songs/n`,
    method: 'POST',
    data: { n }
    
  })
)

export const search = fragment => (
  $.ajax({
    url: 'api/search',
    method: 'GET',
    data: { fragment }
  })
)