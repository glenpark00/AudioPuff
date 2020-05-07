class Api::SongsController < ApplicationController
  before_action :require_login, only: [:create, :update, :destroy]

  def create
    @song = Song.new(song_params)
    @song.user_id = current_user.id
    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    user = User.find_by(profile_url: params[:profile_url])
    @song = Song.find_by(user_id: user.id, song_url: params[:song_url])
    if @song
      render :show
    else
      render json: ['Song not found'], status: 404
    end
  end

  def update
    @song = Song.find_by(id: params[:id])
    if @song.update(song_params)
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
    @songs = Song.where('user_id = ?', params[:user_id])
    render :index
  end

  def fetch_song_file
    @song = Song.find_by(id: params[:id])
    render :file
  end

  def all_songs
    @songs = Song.all
    render :index
  end

  def song_search

  end

  protected
  def song_params
    params.require(:song).permit(:title, :song_url, :genre, :description, :audio_file, :image_file, :duration)
  end

  def require_login
    render json: ['You must be logged in to perform that action'], status: 403 unless logged_in?
  end
end
