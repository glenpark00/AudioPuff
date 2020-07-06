json.songs do
  @songs.each do |song|
    json.set! "#{song.user_url}#{song.song_url.tr('_', '')}" do 
      json.extract! song, :id, :title, :song_url, :user_url, :created_at, :duration, :waveform
      json.likers song.likers.map { |liker| liker.profile_url }
      json.image_url url_for(song.image_file)
    end
  end
end

json.users do
  @users.each do |user|
    json.set! user.profile_url do
      json.partial! partial: 'api/users/user', locals: { user: user }
      json.songs user.songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '')}" }
      json.liked_songs user.liked_songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '')}" } 
      json.followings user.followings.map { |following| following.profile_url }
      json.followers user.followers.map { |follower| follower.profile_url }
    end
  end
  if @followings
    @followings.each do |following|
      json.set! following.profile_url do
        json.extract! following, :id, :display_name, :profile_url
        json.image_url url_for(following.profile_image)
        json.followers following.followers.map { |follower| follower.profile_url }
        json.songs following.songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '')}" }
      end
    end
  end
end