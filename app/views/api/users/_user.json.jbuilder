json.extract! user, :id, :profile_url, :display_name, :first_name, :last_name, :city, :country, :bio
json.image_url url_for(user.profile_image)
json.liked_songs user.liked_songs.map { |song| "#{song.user_url}#{song.song_url.tr('_', '').downcase}" }
json.followers user.followers.map { |follower| follower.profile_url }
json.followings user.followings.map { |following| following.profile_url }