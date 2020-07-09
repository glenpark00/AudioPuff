json.songs do
  @songs.each do |song|
    json.set! "#{song.user_url}#{song.song_url.tr('_', '').downcase}" do 
      json.extract! song, :id, :title, :song_url, :user_url, :genre, :created_at, :duration, :waveform
      json.likers song.likers.map { |liker| liker.profile_url }
      json.image_url url_for(song.image_file)
    end
  end
end

json.users do
  json.set! @user.profile_url do
    json.partial! partial: 'api/users/user', locals: { user: @user }
    json.songs @user.songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '').downcase}" }
    json.liked_songs @user.liked_songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '').downcase}" } 
    json.followings @user.followings.map { |following| following.profile_url }
    json.followers @user.followers.map { |follower| follower.profile_url }
  end
  @follows.each do |follow|
    json.set! follow.profile_url do
      json.extract! follow, :id, :display_name, :profile_url
      json.image_url url_for(follow.profile_image)
      json.followers follow.followers.map { |follower| follower.profile_url }
      json.songs follow.songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '').downcase}" }
    end
  end
end