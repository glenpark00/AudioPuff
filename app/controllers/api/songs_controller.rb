class Api::SongsController < ApplicationController
  def create
    @song = Song.new(create_song_params)
    unless @song.image_file.attached?
      @song.image_file.attach(io: File.open(Rails.root.join('app', 'assets', 'images', 'default_song_image.jpg')), filename: 'default_song_image.jpg')
    end
    @song.user_url = current_user.profile_url
    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.find_by(user_url: params[:profile_url], song_url: params[:song_url])
    if @song
      render :show
    else
      render json: ['Song not found'], status: 404
    end
  end

  def update
    @song = Song.find_by(id: params[:id])
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
    render json: ['Song successfully deleted']
  end

  def index
    @users = [User.find_by(profile_url: params[:user_id])]
    @songs = Song.where('user_url = ?', params[:user_id])
    render :index
  end

  def fetch_song_file
    @song = Song.find_by(id: params[:id])
    render :file
  end

  def fetch_n_songs
    @songs = Song.all.order('RANDOM()').limit(params[:n])
    userUrls = @songs.map { |song| song.user_url }.uniq
    @users = User.where(profile_url: userUrls)
    render :index
  end

  def song_search

  end

  protected
  def create_song_params
    params.require(:song).permit(:title, :song_url, :genre, :description, :audio_file, :image_file, :duration)
  end

  def update_song_params
    params.require(:song).permit(:title, :song_url, :genre, :description, :image_file)
  end

  def

  def require_login
    render json: ['You must be logged in to perform that action'], status: 403 unless logged_in?
  end
end
