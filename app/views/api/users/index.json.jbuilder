@users.map do |user|
  json.set! user.id do
    json.partial! partial: 'api/users/user', locals: { user: user }
  end
end