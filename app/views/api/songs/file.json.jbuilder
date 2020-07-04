json.extract! @song, :id, :song_url, :duration, :user_url, :title
json.image_url url_for(@song.image_file)
json.file_url url_for(@song.audio_file)