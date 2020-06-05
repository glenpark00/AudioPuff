@users.map do |user|
  json.set! user.profile_url do
    json.partial! partial: 'api/users/user', locals: { user: user }
  end
end