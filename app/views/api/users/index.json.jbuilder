@users.map do |user|
  json.set! user.profile_url do
    json.partial! partial: 'api/users/user', locals: { user: user }
    json.songs user.songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '').downcase}" }
  end
end