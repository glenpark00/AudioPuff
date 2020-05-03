json.extract! @song, :id, :title, :song_url, :genre, :description, :user_id, :created_at
json.image_url url_for(@song.image_file)