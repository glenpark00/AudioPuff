json.songs do
  @songs.each do |song|
    json.set! "#{song.user_url}#{song.song_url.tr('_', '').downcase}" do 
      json.extract! song, :id, :title, :song_url, :user_url, :genre, :created_at, :duration, :waveform
      json.likers song.likers.map { |liker| liker.profile_url }
      json.image_url url_for(song.image_file)
    end
  end
end

json.users do
  @users.each do |user|
    json.set! user.profile_url do 
      json.partial! partial: 'api/users/user', locals: { user: user }
      json.songs user.songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '').downcase}" }
    end
  end
end