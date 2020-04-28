export const fetchUser = id => (
  $.ajax({
    url: `api/users/${id}`,
    method: 'GET'
  })
)

export const fetchUsers = () => (
  $.ajax({
    url: 'api/users',
    method: 'GET'
  })
)

export const userExists = identifier => (
  $.ajax({
    url: 'api/exists',
    method: 'GET',
    data: { identifier: identifier },
    success: data => data
  })
)
