json.song do
  json.extract! song, :id, :title, :song_url, :genre, :description, :user_url, :created_at, :duration, :waveform
  json.likers song.likers.map { |liker| liker.profile_url } 
  json.image_url url_for(song.image_file)
end

json.user do
  json.extract! song.user, :id, :profile_url, :display_name
end

json.likers do
  @likers.each do |user|
    unless user == song.user
      json.set! user.profile_url do
        json.extract! user, :id, :profile_url, :display_name
        json.image_url url_for(user.profile_image)
      end
    end
  end
end