const SessionApiUtil = {
  signup: user => (
    $.ajax({
      url: 'api/users',
      method: 'POST',
      data: { user }
    })
  ),

  login: user => (
    $.ajax({
      url: 'api/session',
      method: 'POST',
      data: { user }
    })
  ),

  logout: () => (
    $.ajax({
      url: 'api/session',
      method: 'DELETE'
    })
  )
};

export default SessionApiUtil;