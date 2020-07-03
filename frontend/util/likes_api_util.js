export const like = data => (
  $.ajax({
    url: 'api/likes',
    method: 'POST',
    data
  })
)

export const unlike = data => (
  $.ajax({
    url: 'api/likes',
    method: 'DELETE',
    data
  })
)