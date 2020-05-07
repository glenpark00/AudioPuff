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

export const fetchUserDisplay = userId => (
  $.ajax({
    url: `api/user-display/${userId}`,
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
    data: { identifier },
    success: data => data
  })
)

export const fetchUserSongs = userId => (
  $.ajax({
    url: `api/users/${userId}/songs`,
    method: 'GET'
  })
)

