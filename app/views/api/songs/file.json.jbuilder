json.extract! @song, :id, :duration, :user_url, :title
json.image_url url_for(@song.image_file)
json.file_url url_for(@song.audio_file)