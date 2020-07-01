json.songs do
  @songs.each do |song|
    json.set! "#{song.user_url}#{song.song_url}" do 
      json.extract! song, :id, :title, :song_url, :user_url, :created_at, :duration, :waveform
      json.image_url url_for(song.image_file)
    end
  end
end

json.users do
  @users.each do |user|
    json.set! user.profile_url do
      json.partial! partial: 'api/users/user', locals: { user: user }
    end
  end 
end