class Api::SongsController < ApplicationController
  def create
    @song = Song.new(create_song_params)
    unless @song.image_file.attached?
      @song.image_file.attach(io: File.open(Rails.root.join('app', 'assets', 'images', 'default_song_image.jpg')), filename: 'default_song_image.jpg')
    end
    @song.user_url = current_user.profile_url
    @likers = []
    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.includes(:likers).find_by(user_url: params[:profile_url], song_url: params[:song_url])
    @likers = @song.likers.includes(:songs, :liked_songs, :followers, :followings).with_attached_profile_image
    if @song
      render :show
    else
      render json: ['Song not found'], status: 404
    end
  end

  def update
    @song = Song.includes(:likers, :user).find_by(id: params[:id])
    @likers = @song.likers.with_attached_profile_image
    if params[:song][:image_file] == 'null'
      params[:song][:image_file] = @song.image_file
    end
    if @song.update(update_song_params)
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def destroy
    @song = Song.find_by(id: params[:id])
    @song.destroy
    @likers = []
    render :show
  end

  def index
    @user = User.with_attached_profile_image.find_by(profile_url: params[:user_id])
    @songs = Song.with_attached_image_file.includes(:likers).where('user_url = ?', params[:user_id])
    render :index
  end

  def fetch_song_file
    @song = Song.find_by(id: params[:id])
    render :file
  end

  def fetch_n_songs
    # @songs = Song.all.order('RANDOM()').limit(params[:n])
    @songs = Song.with_attached_image_file.eager_load(:user).includes(:likers).all.limit(params[:n])
    userUrls = @songs.map { |song| song.user_url }.uniq
    @users = User.with_attached_profile_image.includes(:songs).where(profile_url: userUrls)
    render :songs_users
  end

  def all_songs
    @songs = Song.with_attached_image_file.includes(:likers)
    render :all_songs
  end

  def search
    @songs = Song.with_attached_image_file.includes(:user).where('LOWER(title) LIKE ?', "#{params[:fragment].downcase}%")
    @users = []
    @song_users = []
    @songs.each do |song|
      @song_users.push(song.user)
    end
    @users = User.with_attached_profile_image.includes(:songs, :liked_songs, :followers, :followings).where('LOWER(display_name) LIKE ?', "#{params[:fragment].downcase}%")
    render :songs_users
  end

  protected
  def create_song_params
    params.require(:song).permit(:title, :song_url, :genre, :description, :audio_file, :image_file, :duration, :waveform)
  end

  def update_song_params
    params.require(:song).permit(:title, :song_url, :genre, :description, :image_file)
  end

  def

  def require_login
    render json: ['You must be logged in to perform that action'], status: 403 unless logged_in?
  end
end
