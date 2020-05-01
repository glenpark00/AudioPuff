export const createSong = (song) => (
  $.ajax({
    url: `api/songs`,
    method: 'POST',
    data: song,
    contentType: false,
    processData: false
  })
)

export const fetchSongFileUrl = songId => (
  $.ajax({
    url: `api/songs/${songId}/file`,
    method: 'GET'
  })
)