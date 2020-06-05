export const fetchUser = userId => (
  $.ajax({
    url: `api/users/${userId}`,
    method: 'GET'
  })
)

export const updateUser = user => (
  $.ajax({
    url: `api/users/${user.get('user[id]')}`,
    method: 'PATCH',
    data: user,
    contentType: false,
    processData: false
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
    data: { identifier },
    success: data => data
  })
)

export const fetchUserSongs = profileUrl => (
  $.ajax({
    url: `api/users/${profileUrl}/songs`,
    method: 'GET'
  })
)