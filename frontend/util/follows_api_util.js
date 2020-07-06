export const follow = data => (
  $.ajax({
    url: 'api/follows',
    method: 'POST',
    data
  })
)

export const unfollow = data => (
  $.ajax({
    url: 'api/follows',
    method: 'DELETE',
    data
  })
)