@songs.each do |song|
  json.set! song.id do 
    json.extract! song, :id, :title, :song_url, :user_id, :created_at
    json.image_url url_for(song.image_file)
  end
end