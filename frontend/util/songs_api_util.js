export const createSong = (song, currentUserId) => (
  $.ajax({
    url: `api/users/${currentUserId}/songs`,
    method: 'POST',
    data: { song }
  })
)