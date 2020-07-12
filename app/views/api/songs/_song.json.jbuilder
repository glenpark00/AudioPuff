json.song do
  json.extract! song, :id, :title, :song_url, :genre, :description, :user_url, :created_at, :duration, :waveform
  json.likers song.likers.map { |liker| liker.profile_url } 
  json.image_url url_for(song.image_file)
end

json.user do
  json.partial! 'api/users/user', locals: { user: song.user }
  json.songs song.user.songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '').downcase}" }
end

json.likers do
  @likers.each do |user|
    unless user == song.user
      json.set! user.profile_url do
        json.partial! 'api/users/user', locals: { user: user }
        json.songs user.songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '').downcase}" }
      end
    end
  end
end