@songs.each do |song|
  json.set! song.id do 
    json.extract! song, :id, :title, :user_id
    json.image_url url_for(song.image_file)
  end
end