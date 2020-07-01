json.song do
  json.extract! song, :id, :title, :song_url, :genre, :description, :user_url, :created_at, :duration, :waveform
  json.image_url url_for(song.image_file)
end

json.user do
  json.extract! song.user, :id, :profile_url, :display_name
end