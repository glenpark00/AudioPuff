json.songs do
  @songs.each do |song|
    json.set! "#{song.user_url}#{song.song_url.tr('_', '').downcase}" do 
      json.extract! song, :id, :title, :song_url, :genre, :description, :user_url, :created_at, :duration, :waveform
      json.likers song.likers.map { |liker| liker.profile_url } 
      json.image_url url_for(song.image_file)
    end
  end
end